import { IsNumber, IsString } from "class-validator";

export class Example {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString({ each: true })
  relatives: string[];
}
