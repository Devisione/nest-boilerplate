import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExamplesModule } from "./examples/examples.module";
import { ExternalApiModule } from "./external-api/external-api.module";
import { configuration } from "./common/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ExamplesModule,
    ExternalApiModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
