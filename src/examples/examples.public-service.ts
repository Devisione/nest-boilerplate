import { Injectable } from "@nestjs/common";
import { HttpService } from "@app/http";
import { ExternalApiService } from "../external-api/external-api.service";

@Injectable()
export class ExamplesPublicService {
  constructor(
    private readonly httpFakeApiService: HttpService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  async exampleExternalRequest(): Promise<{
    products: object[];
    posts: object[];
  }> {
    const responseProducts =
      await this.httpFakeApiService.get<object[]>("/products");
    const responsePosts = await this.externalApiService.get<object[]>("/posts");

    return { products: responseProducts.data, posts: responsePosts.data };
  }

  healthCheck(): string {
    return "Ok";
  }
}
