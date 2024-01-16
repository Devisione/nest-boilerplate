import { SwaggerModule } from "@nestjs/swagger";
import type { INestApplication } from "@nestjs/common";
import { config } from "./config";

export const setupOpenApi = (app: INestApplication): void => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  });
};
