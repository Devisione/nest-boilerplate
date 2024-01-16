import { Inject, Injectable } from "@nestjs/common";
import axios, { Axios } from "axios";
import { HttpModuleOptions } from "./http.interface";
import { HTTP_MODULE_TOKEN } from "./http.constants";

@Injectable()
export class HttpService extends Axios {
  constructor(
    @Inject(HTTP_MODULE_TOKEN)
    protected readonly config: HttpModuleOptions = {},
  ) {
    // @ts-expect-error - получаем дефолтные настройки аксиоса
    super({ ...axios.defaults, ...config });
  }
}
