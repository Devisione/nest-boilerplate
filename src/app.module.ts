import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExamplesModule } from "./examples/examples.module";
import { ExternalApiModule } from "./external-api/external-api.module";

@Module({
  imports: [ExamplesModule, ExternalApiModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
