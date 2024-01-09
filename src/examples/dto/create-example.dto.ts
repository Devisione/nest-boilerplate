import { ArrayMaxSize, ArrayMinSize, IsString, Length } from "class-validator";

export class CreateExampleDto {
  @Length(5, 20)
  @IsString()
  name: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  relatives: string[];
}
