import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { ExamplesController } from "./examples.controller";
import { ExamplesService } from "./examples.service";
import type { Example } from "./entities/example.entity";
import type { CreateExampleDto } from "./dto/create-example.dto";

const EXAMPLE_MOCK: Example = {
  id: 1,
  name: "name",
  relatives: ["relative"],
};
const CREATE_EXAMPLE_DTO_MOCK: CreateExampleDto = {
  name: "name",
  relatives: ["relative"],
};

describe("Testing for examples controller", () => {
  let controller: ExamplesController;
  let service: ExamplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamplesController],
      providers: [ExamplesService],
    }).compile();

    module.useLogger(false);
    controller = module.get<ExamplesController>(ExamplesController);
    service = module.get<ExamplesService>(ExamplesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should find all examples", () => {
    jest.spyOn(service, "findAll").mockImplementation(() => [EXAMPLE_MOCK]);
    expect(controller.findAll()).toEqual([EXAMPLE_MOCK]);
  });

  it("should find one examples", () => {
    jest.spyOn(service, "findOne").mockImplementation(() => EXAMPLE_MOCK);
    expect(controller.findOne("1")).toEqual(EXAMPLE_MOCK);
  });

  it("should create examples", () => {
    jest.spyOn(service, "create").mockImplementation(() => 1);
    expect(controller.create(CREATE_EXAMPLE_DTO_MOCK)).toEqual(1);
  });

  it("should update example", () => {
    jest.spyOn(service, "update").mockImplementation(() => 1);
    expect(controller.update("1", { name: "updated" })).toEqual(1);
  });

  it("should remove example", () => {
    jest.spyOn(service, "remove").mockImplementation(() => 1);
    expect(controller.remove("1")).toEqual(1);
  });
});
