import { Injectable } from "@nestjs/common";
import { HttpService } from "@app/http";

@Injectable()
export class ExternalApiService extends HttpService {}
