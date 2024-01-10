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
import { AuthCookieGuard } from "../common/guards";
import { ExamplesPrivateService } from "./examples.private-service";
import { CreateExampleDto } from "./dto/create-example.dto";
import { UpdateExampleDto } from "./dto/update-example.dto";
import type { Example } from "./entities/example.entity";

@UseGuards(AuthCookieGuard)
@Controller("examples")
export class ExamplesPrivateController {
  constructor(private readonly exampleService: ExamplesPrivateService) {}

  @Post()
  create(@Body() createExampleDto: CreateExampleDto): Example["id"] {
    return this.exampleService.create(createExampleDto);
  }

  @Get()
  findAll(): Example[] {
    return this.exampleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Example | undefined {
    return this.exampleService.findOne(Number(id));
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateExampleDto: UpdateExampleDto,
  ): Example["id"] {
    return this.exampleService.update(Number(id), updateExampleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Example["id"] {
    return this.exampleService.remove(Number(id));
  }
}
