import type { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import type { AxiosRequestConfig } from "axios";
import { AXIOS_TOKEN } from "@app/http/http.constants";
import { HttpService } from "./http.service";

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {
  static register(config: AxiosRequestConfig = {}): DynamicModule {
    return {
      module: HttpModule,
      providers: [
        {
          provide: AXIOS_TOKEN,
          useValue: config,
        },
      ],
    };
  }
}
