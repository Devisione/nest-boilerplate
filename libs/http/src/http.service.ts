import { Inject, Injectable } from "@nestjs/common";
import axios, { Axios, AxiosRequestConfig } from "axios";
import { AXIOS_TOKEN } from "./http.constants";

@Injectable()
export class HttpService extends Axios {
  constructor(
    @Inject(AXIOS_TOKEN)
    protected readonly axiosConfig: AxiosRequestConfig = {},
  ) {
    // @ts-expect-error - получаем дефолтные настройки аксиоса
    super({ ...axios.defaults, ...axiosConfig });
  }
}
