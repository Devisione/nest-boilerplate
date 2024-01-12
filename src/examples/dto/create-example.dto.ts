import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class RelativeDto {
  @Length(5, 20)
  @IsString({ message: "$property Строка" })
  name: string;
}

export class CreateExampleDto {
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
