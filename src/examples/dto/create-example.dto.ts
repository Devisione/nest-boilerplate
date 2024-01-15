import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { Example } from "../entities/example.entity";

class RelativeDto {
  @Length(5, 20)
  // $property указывать обязательно, чтобы путь до ошибки в овтете был верным
  @IsString({ message: "$property не строка" })
  name: string;
}

export class CreateExampleDto {
  // По умолчанию свагер берет правила из декораторов class-validator, но если нужно сделать кастомное описание, то можно сделать так:
  @ApiProperty({
    description: "Название примера",
    type: "string",
    minimum: 5,
    maximum: 20,
    required: true,
    example: "название примера",
  })
  @Length(5, 20)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => RelativeDto)
  @ValidateNested({ each: true })
  @ArrayMaxSize(5)
  @IsArray()
  @IsNotEmpty()
  relatives: RelativeDto[];
}

export class CreateExampleOutputDto extends PickType(Example, ["id"]) {}
