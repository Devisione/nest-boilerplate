import { DocumentBuilder } from "@nestjs/swagger";
import { AUTH_COOKIE_NAME } from "../constants/auth-names";

export const config = new DocumentBuilder()
  .setTitle("Nest boilerplate example")
  .setDescription("Example app")
  .setVersion("1.0")
  .addTag("nest-boilerplate")
  .addCookieAuth(AUTH_COOKIE_NAME)
  .addBearerAuth()
  .build();
