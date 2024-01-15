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

  @Get("/health-check")
  @ApiOkResponse({
    type: "string",
    description: "Описание ответа",
  })
  find(): string {
    return this.examplesPublicService.healthCheck();
  }
}
