import type { DynamicModule, Provider } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { HTTP_MODULE_TOKEN } from "@app/http/http.constants";
import { HttpService } from "./http.service";
import type {
  HttpModuleAsyncOptions,
  HttpModuleOptions,
  HttpModuleOptionsFactory,
} from "./http.interface";

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {
  public static register(config: HttpModuleOptions = {}): DynamicModule {
    return {
      module: HttpModule,
      providers: [
        {
          provide: HTTP_MODULE_TOKEN,
          useValue: config,
        },
      ],
    };
  }

  public static registerAsync(options: HttpModuleAsyncOptions): DynamicModule {
    return {
      module: HttpModule,
      imports: options.imports,
      providers: this.createConnectProviders(options),
    };
  }

  private static createConnectProviders(
    options: HttpModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createConnectOptionsProvider(options)];
    }

    const providers = [this.createConnectOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createConnectOptionsProvider(
    options: HttpModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_MODULE_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    let inject;
    if (options.useExisting) inject = [options.useExisting];
    else if (options.useClass) inject = [options.useClass];

    return {
      provide: HTTP_MODULE_TOKEN,
      useFactory: async (optionsFactory: HttpModuleOptionsFactory) =>
        optionsFactory.createHttpOptions(),
      inject,
    };
  }
}
