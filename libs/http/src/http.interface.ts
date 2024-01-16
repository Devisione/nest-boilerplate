import type { AxiosRequestConfig } from "axios";
import type {
  ModuleMetadata,
  Type,
  InjectionToken,
  OptionalFactoryDependency,
} from "@nestjs/common";

export type HttpModuleOptions = AxiosRequestConfig;

export interface HttpModuleOptionsFactory {
  createHttpOptions: () => Promise<HttpModuleOptions> | HttpModuleOptions;
}

export interface HttpModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<HttpModuleOptionsFactory>;
  useClass?: Type<HttpModuleOptionsFactory>;
  useFactory?: (
    ...args: unknown[]
  ) => Promise<HttpModuleOptions> | HttpModuleOptions;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- never необходим для соответствия с внутренним типом неста
  inject?: (InjectionToken | OptionalFactoryDependency)[] | never;
}
