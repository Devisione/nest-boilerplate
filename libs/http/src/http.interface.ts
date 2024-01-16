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
  inject?: (InjectionToken | OptionalFactoryDependency)[] | never;
}
