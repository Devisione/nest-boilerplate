import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import type { CreateExampleDto } from "./dto/create-example.dto";
import type { UpdateExampleDto } from "./dto/update-example.dto";
import type { Example } from "./entities/example.entity";

@Injectable()
export class ExamplesPrivateService {
  public examplesList: Example[] = [];
  private readonly logger = new Logger(ExamplesPrivateService.name);

  create(createExampleInputDto: CreateExampleDto): Example["id"] {
    this.logger.log(
      `Создание example: ${JSON.stringify(createExampleInputDto)}`,
    );

    const newExampleItem: Example = {
      ...createExampleInputDto,
      id: Math.floor(Math.random() * 1000000),
    };
    this.examplesList.push(newExampleItem);

    this.logger.verbose(
      `Example c name - ${createExampleInputDto.name} успешно создан`,
    );
    return newExampleItem.id;
  }

  findAll(): Example[] {
    return this.examplesList;
  }

  findOne(id: number): Example | undefined {
    return this.examplesList.find((example) => example.id === id);
  }

  update(id: number, updateExampleDto: UpdateExampleDto): Example["id"] {
    this.logger.log(`Обновление example с id - ${id}`);

    const foundExampleIdx = this.examplesList.findIndex(
      (example) => example.id === id,
    );

    if (foundExampleIdx === -1) {
      this.logger.error(`Example с id - ${id} не найден`);
      throw new HttpException(
        {
          error: `Example с id - ${id} не найден`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedExample: Example = {
      ...this.examplesList[foundExampleIdx],
      ...updateExampleDto,
    };
    this.examplesList.splice(
      foundExampleIdx,
      foundExampleIdx + 1,
      updatedExample,
    );

    this.logger.verbose(`Example c id - ${id} успешно обновлен`);
    return id;
  }

  remove(id: number): Example["id"] {
    this.logger.log(`Удаление example с id - ${id}`);

    const foundExampleIdx = this.examplesList.findIndex(
      (example) => example.id === id,
    );

    if (foundExampleIdx === -1) {
      this.logger.error(`Example с id - ${id} не найден`);
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
    return id;
  }
}
