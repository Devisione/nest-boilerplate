import { Module } from "@nestjs/common";
import { HttpModule, HttpService } from "@app/http";
import { ExternalApiService } from "./external-api.service";

@Module({
  imports: [
    HttpModule.register({ baseURL: "https://jsonplaceholder.typicode.com/" }),
  ],
  providers: [{ provide: ExternalApiService, useExisting: HttpService }],
  exports: [ExternalApiService],
})
export class ExternalApiModule {}
