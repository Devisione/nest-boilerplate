import { Module } from "@nestjs/common";
import { ExamplesPrivateService } from "./examples.private-service";
import { ExamplesPublicService } from "./examples.public-service";
import { ExamplesPrivateController } from "./examples.private-controller";
import { ExamplesPublicController } from "./examples.public-controller";

@Module({
  // Чтобы не было конфликтов у гвардов, лучше располагать контроллеры так: 1) публичный, 2) приватный
  controllers: [ExamplesPublicController, ExamplesPrivateController],
  providers: [ExamplesPublicService, ExamplesPrivateService],
})
export class ExamplesModule {}
