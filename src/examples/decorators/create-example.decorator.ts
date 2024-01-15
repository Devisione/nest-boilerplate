import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";
import { UpdateExampleOutputDto } from "../dto/update-example.dto";

export const CreateExampleDecorator = (): ReturnType<
  typeof applyDecorators
> => {
  return applyDecorators(
    ApiOkResponse({
      type: UpdateExampleOutputDto,
      description: "Обновление примера по id",
    }),
    ApiBadRequestResponse({
      description: "Пример не найден",
    }),
  );
};
