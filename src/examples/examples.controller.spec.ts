import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { ExamplesPrivateController } from "./examples.private-controller";
import { ExamplesPrivateService } from "./examples.private-service";
import type { Example } from "./entities/example.entity";
import type { CreateExampleDto } from "./dto/create-example.dto";

const EXAMPLE_MOCK: Example = {
  id: 1,
  name: "name",
  relatives: [{ id: 1, name: "relative" }],
};
const CREATE_EXAMPLE_DTO_MOCK: CreateExampleDto = {
  name: "name",
  relatives: [{ name: "relative" }],
};

describe("Testing for examples controller", () => {
  let controller: ExamplesPrivateController;
  let service: ExamplesPrivateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamplesPrivateController],
      providers: [ExamplesPrivateService],
    }).compile();

    module.useLogger(false);
    controller = module.get<ExamplesPrivateController>(
      ExamplesPrivateController,
    );
    service = module.get<ExamplesPrivateService>(ExamplesPrivateService);
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
