import { PickType } from "@nestjs/swagger";
import { Example } from "../entities/example.entity";

export class DeleteExampleOutputDto extends PickType(Example, ["id"]) {}
