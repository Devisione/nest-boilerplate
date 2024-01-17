import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBody,
} from "@nestjs/swagger";
import { AuthCookieGuard } from "../common/guards";
import { ExamplesPrivateService } from "./examples.private-service";
import { Example } from "./entities/example.entity";
import {
  CreateExampleDto,
  CreateExampleOutputDto,
} from "./dto/create-example.dto";
import {
  UpdateExampleDto,
  UpdateExampleOutputDto,
} from "./dto/update-example.dto";
import { DeleteExampleOutputDto } from "./dto/delete-example.dto";
import { CreateExampleDecorator } from "./decorators/create-example.decorator";

@UseGuards(AuthCookieGuard)
@ApiCookieAuth()
@ApiTags("examples-private")
@Controller("examples")
export class ExamplesPrivateController {
  constructor(private readonly exampleService: ExamplesPrivateService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateExampleOutputDto,
    description: "Создание примера",
  })
  // В свагер автоматически попадает схема из @Body, но для кастомного описания можно использовать декораторы ApiBody, ApiParam и т.д
  @ApiBody({
    type: [CreateExampleDto],
    description: "Объект для создания примера",
  })
  create(@Body() createExampleDto: CreateExampleDto): CreateExampleOutputDto {
    return this.exampleService.create(createExampleDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Example],
    description: "Получение примеров",
  })
  findAll(): Example[] {
    return this.exampleService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({
    type: Example,
    description: "Получение примера по id",
  })
  @ApiBadRequestResponse({
    description: "Пример не найден",
  })
  findOne(@Param("id") id: string): Example | undefined {
    return this.exampleService.findOne(Number(id));
  }

  @Patch(":id")
  // Если декораторов много или их можно переиспользовать, то можно их обернуть в кастомный декоратор
  @CreateExampleDecorator()
  update(
    @Param("id") id: string,
    @Body() updateExampleDto: UpdateExampleDto,
  ): UpdateExampleOutputDto {
    return this.exampleService.update(Number(id), updateExampleDto);
  }

  @Delete(":id")
  @ApiOkResponse({
    type: DeleteExampleOutputDto,
    description: "Удаление примера по id",
  })
  @ApiBadRequestResponse({
    description: "Пример не найден",
  })
  remove(@Param("id") id: string): DeleteExampleOutputDto {
    return this.exampleService.remove(Number(id));
  }
}
