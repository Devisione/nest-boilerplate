import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./common/filters";
import { CustomValidationPipe } from "./common/pipes";
import { setupOpenApi } from "./common/openapi";
import type { Configuration } from "./common/configuration";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Configuration, true> =
    app.get(ConfigService);
  const port = configService.get("port", { infer: true });

  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new CustomValidationPipe());
  setupOpenApi(app);
  await app.listen(port);
}
void bootstrap();
