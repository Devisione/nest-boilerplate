import { PartialType, PickType } from "@nestjs/swagger";
import { Example } from "../entities/example.entity";
import { CreateExampleDto } from "./create-example.dto";

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}

export class UpdateExampleOutputDto extends PickType(Example, ["id"]) {}
