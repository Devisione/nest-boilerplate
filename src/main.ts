import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./common/filters";
import { CustomValidationPipe } from "./common/pipes";
import { setupOpenApi } from "./common/openapi";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new CustomValidationPipe());
  setupOpenApi(app);
  await app.listen(3000);
}
void bootstrap();
