import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Catch, HttpException, HttpStatus, Logger } from "@nestjs/common";
import type { Request, Response } from "express";
import type { ErrorCodes } from "../constants";
import { MAP_STATUS_CODE_TO_ERROR_CODE } from "../constants";

interface ErrorResponse {
  message: string;
  errorCode: ErrorCodes;
  statusCode: HttpStatus;
  data: string | object;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException | Error | object, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse =
      exception instanceof HttpException
        ? this.httpExceptionHandle(exception)
        : this.unknownExceptionHandle(exception);

    this.logger.error(
      `[${request.method}] ${request.path}, statusCode: ${errorResponse.statusCode}, message: ${errorResponse.message}`,
      "stack" in exception ? JSON.stringify(exception.stack) : undefined,
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  httpExceptionHandle(exception: HttpException): ErrorResponse {
    const statusCode = exception.getStatus();
    const response = exception.getResponse();
    const message = exception.message;
    const errorCode =
      typeof response === "object" && "errorCode" in response
        ? (response.errorCode as ErrorCodes)
        : MAP_STATUS_CODE_TO_ERROR_CODE[statusCode];

    return {
      message,
      errorCode,
      statusCode,
      data: response,
    };
  }

  unknownExceptionHandle(exception: unknown): ErrorResponse {
    if (exception instanceof Error) {
      return {
        message: exception.message,
        errorCode:
          MAP_STATUS_CODE_TO_ERROR_CODE[HttpStatus.INTERNAL_SERVER_ERROR],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: exception.message,
      };
    }

    return {
      message: "Непредвиденная ошибка",
      errorCode:
        MAP_STATUS_CODE_TO_ERROR_CODE[HttpStatus.INTERNAL_SERVER_ERROR],
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: "Непредвиденная ошибка",
    };
  }
}
