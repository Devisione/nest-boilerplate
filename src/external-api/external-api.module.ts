import { Module } from "@nestjs/common";
import { HttpModule, HttpService } from "@app/http";
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { Configuration } from "../common/configuration";
import { ExternalApiService } from "./external-api.service";

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Configuration, true>) => ({
        baseURL: configService.get("api.external", { infer: true }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [{ provide: ExternalApiService, useExisting: HttpService }],
  exports: [ExternalApiService],
})
export class ExternalApiModule {}
