import { Injectable } from "@nestjs/common";

@Injectable()
export class ExamplesPublicService {
  healthCheck(): string {
    return "Ok";
  }
}
