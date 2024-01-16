import { Module } from "@nestjs/common";
import { HttpModule } from "@app/http";
import { ExternalApiModule } from "../external-api/external-api.module";
import { ExamplesPrivateService } from "./examples.private-service";
import { ExamplesPublicService } from "./examples.public-service";
import { ExamplesPrivateController } from "./examples.private-controller";
import { ExamplesPublicController } from "./examples.public-controller";

@Module({
  imports: [
    HttpModule.register({ baseURL: "https://fakestoreapi.com/" }),
    ExternalApiModule,
  ],
  // Чтобы не было конфликтов у гвардов, лучше располагать контроллеры так: 1) публичный, 2) приватный
  controllers: [ExamplesPublicController, ExamplesPrivateController],
  providers: [ExamplesPublicService, ExamplesPrivateService],
})
export class ExamplesModule {}
