import { beforeAll, describe, expect, it } from "vitest";
import { Step } from "../../entities/Step";
import { InMemoryStepsRepository } from "../../repositories/in-memory/InMemoryStepsRepository";
import { fakeStep } from "../../utils/mockDataVitest";
import { CreateStepService } from "../createStep/CreateStepService";
import { GetStepService } from "./GetStepsService";

describe("Get All Steps", () => {
  let getStepService: GetStepService;
  let inMemoryStepsRepository: InMemoryStepsRepository;
  beforeAll(() => {
    inMemoryStepsRepository = new InMemoryStepsRepository();
    getStepService = new GetStepService(inMemoryStepsRepository);
  });
  it("should get all steps", async () => {
    const data = await new CreateStepService(inMemoryStepsRepository).execute(
      fakeStep({})
    );

    const response = await getStepService.execute();
    expect(response).toBeTypeOf("object");
    expect(response).toHaveLength(1);
    expect(response[0]).toEqual(
      expect.objectContaining({
        ...data,
      })
    );
  });
});
