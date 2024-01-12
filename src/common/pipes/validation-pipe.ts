import type { ValidationError } from "@nestjs/common";
import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from "@nestjs/common";
import { ErrorCodes } from "../constants";

interface ErrorField {
  path: string[];
  message: string;
}

interface ErrorResult {
  errorCode: ErrorCodes.ValidationError;
  message: string;
  fields: ErrorField[];
}

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown {
    return (validationErrors = []) => {
      const detailErrors = this.makeDetailedErrors(validationErrors);
      return new BadRequestException(detailErrors);
    };
  }

  makeDetailedErrors(validationErrors: ValidationError[]): ErrorResult {
    const errorsMessages = this.flattenValidationErrors(validationErrors);
    return {
      errorCode: ErrorCodes.ValidationError,
      message: "Validation Error Exception",
      fields: errorsMessages.map((errorMessage) => {
        const splitErrorMessage = errorMessage.split(" ");
        const path = splitErrorMessage.splice(0, 1)[0].split(".");

        return {
          path,
          message: splitErrorMessage.join(" "),
        };
      }),
    };
  }
}
