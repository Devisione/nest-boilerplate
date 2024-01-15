import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { HttpException } from "@nestjs/common";
import { ExamplesPrivateService } from "./examples.private-service";
import type { Example } from "./entities/example.entity";
import type { CreateExampleDto } from "./dto/create-example.dto";

const RANDOM_MOCK = 0.123456789;
const CREATE_EXAMPLE_ID_MOCK = Math.floor(RANDOM_MOCK * 1000000);

const EXAMPLE_MOCK: Example = {
  id: 1,
  name: "name",
  relatives: [{ id: 1, name: "relative" }],
};
const CREATE_EXAMPLE_DTO_MOCK: CreateExampleDto = {
  name: "name",
  relatives: [{ name: "relative" }],
};
const CREATED_EXAMPLE_MOCK: Example = {
  id: CREATE_EXAMPLE_ID_MOCK,
  ...CREATE_EXAMPLE_DTO_MOCK,
  relatives: [{ id: CREATE_EXAMPLE_ID_MOCK, name: "relative" }],
};

describe("Testing for examples service", () => {
  let service: ExamplesPrivateService;

  beforeEach(async () => {
    jest.spyOn(global.Math, "random").mockReturnValue(RANDOM_MOCK);
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamplesPrivateService],
    }).compile();

    module.useLogger(false);
    service = module.get<ExamplesPrivateService>(ExamplesPrivateService);
    service.examplesList = [EXAMPLE_MOCK];
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find all examples", () => {
    expect(service.findAll()).toEqual([EXAMPLE_MOCK]);
  });

  it("should find one example", () => {
    expect(service.findOne(1)).toEqual(EXAMPLE_MOCK);
  });

  it("should create example", () => {
    expect(service.create(CREATE_EXAMPLE_DTO_MOCK)).toEqual({
      id: CREATE_EXAMPLE_ID_MOCK,
    });
    expect(service.examplesList).toEqual([EXAMPLE_MOCK, CREATED_EXAMPLE_MOCK]);
  });

  it("should update example", () => {
    expect(service.update(1, { name: "updated" })).toEqual({ id: 1 });
    expect(service.findOne(1)).toEqual({ ...EXAMPLE_MOCK, name: "updated" });

    expect(() => service.update(2, { name: "updated" })).toThrow(HttpException);
  });

  it("should remove example", () => {
    expect(service.remove(1)).toEqual({ id: 1 });
    expect(service.examplesList).toEqual([]);

    expect(() => service.remove(2)).toThrow(HttpException);
  });
});
