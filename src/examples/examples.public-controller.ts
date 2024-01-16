import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthHeaderGuard } from "../common/guards";
import { ExamplesPublicService } from "./examples.public-service";

@UseGuards(AuthHeaderGuard)
@ApiBearerAuth()
@ApiTags("examples-public")
@Controller("examples")
export class ExamplesPublicController {
  constructor(private readonly examplesPublicService: ExamplesPublicService) {}

  @Get("/external-request")
  @ApiOkResponse({
    description: "Описание ответа",
  })
  exampleExternalRequest(): Promise<{
    products: object[];
    posts: object[];
  }> {
    return this.examplesPublicService.exampleExternalRequest();
  }

  @Get("/health-check")
  @ApiOkResponse({
    description: "Описание ответа",
  })
  healthCheck(): string {
    return this.examplesPublicService.healthCheck();
  }
}
