import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthHeaderGuard } from "../common/guards";
import { ExamplesPublicService } from "./examples.public-service";

@UseGuards(AuthHeaderGuard)
@Controller("examples")
export class ExamplesPublicController {
  constructor(private readonly examplesPublicService: ExamplesPublicService) {}

  @Get("/health-check")
  find(): string {
    return this.examplesPublicService.healthCheck();
  }
}
