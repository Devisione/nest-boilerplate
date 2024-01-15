import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import type { Example } from "./entities/example.entity";
import type {
  CreateExampleDto,
  CreateExampleOutputDto,
} from "./dto/create-example.dto";
import type {
  UpdateExampleDto,
  UpdateExampleOutputDto,
} from "./dto/update-example.dto";
import type { DeleteExampleOutputDto } from "./dto/delete-example.dto";

@Injectable()
export class ExamplesPrivateService {
  public examplesList: Example[] = [];
  private readonly logger = new Logger(ExamplesPrivateService.name);

  create(createExampleInputDto: CreateExampleDto): CreateExampleOutputDto {
    this.logger.log(
      `Создание example: ${JSON.stringify(createExampleInputDto)}`,
    );

    const newExampleItem: Example = {
      id: Math.floor(Math.random() * 1000000),
      name: createExampleInputDto.name,
      relatives: createExampleInputDto.relatives.map((relative) => ({
        id: Math.floor(Math.random() * 1000000),
        name: relative.name,
      })),
    };
    this.examplesList.push(newExampleItem);

    this.logger.verbose(
      `Example c name - ${createExampleInputDto.name} успешно создан`,
    );
    return { id: newExampleItem.id };
  }

  findAll(): Example[] {
    return this.examplesList;
  }

  findOne(id: number): Example | undefined {
    return this.examplesList.find((example) => example.id === id);
  }

  update(
    id: number,
    updateExampleDto: UpdateExampleDto,
  ): UpdateExampleOutputDto {
    this.logger.log(`Обновление example с id - ${id}`);

    const foundExampleIdx = this.examplesList.findIndex(
      (example) => example.id === id,
    );

    if (foundExampleIdx === -1) {
      throw new HttpException(
        `Example с id - ${id} не найден`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedExample: Example = {
      ...this.examplesList[foundExampleIdx],
      ...updateExampleDto,
      relatives: updateExampleDto.relatives
        ? updateExampleDto.relatives.map((relative) => ({
            id: Math.floor(Math.random() * 1000000),
            name: relative.name,
          }))
        : this.examplesList[foundExampleIdx].relatives,
    };
    this.examplesList.splice(
      foundExampleIdx,
      foundExampleIdx + 1,
      updatedExample,
    );

    this.logger.verbose(`Example c id - ${id} успешно обновлен`);
    return { id };
  }

  remove(id: number): DeleteExampleOutputDto {
    this.logger.log(`Удаление example с id - ${id}`);

    const foundExampleIdx = this.examplesList.findIndex(
      (example) => example.id === id,
    );

    if (foundExampleIdx === -1) {
      // Пример ошибки с объектом, можно выбросить любой объект и он попадет в ответ в поле data
      throw new HttpException(
        {
          error: `Example с id - ${id} не найден`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    this.examplesList = this.examplesList.filter(
      (example) => example.id !== id,
    );

    this.logger.verbose(`Example c id - ${id} успешно удален`);
    return { id };
  }
}
