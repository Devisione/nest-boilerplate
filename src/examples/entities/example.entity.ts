import { IsNumber, IsString, ValidateNested } from "class-validator";

class Relative {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export class Example {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @ValidateNested({ each: true })
  relatives: Relative[];
}
