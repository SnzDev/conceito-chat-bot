import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryStepsRepository } from "../../repositories/in-memory/InMemoryStepsRepository";
import { fakeStep } from "../../utils/mockDataVitest";
import { CreateStepService } from "../createStep/CreateStepService";
import { GetStepsService } from "./GetStepsService";

describe("Get Steps Service", () => {
  let getStepsService: GetStepsService;
  let inMemoryStepsRepository: InMemoryStepsRepository;
  beforeAll(() => {
    inMemoryStepsRepository = new InMemoryStepsRepository();
    getStepsService = new GetStepsService(inMemoryStepsRepository);
  });
  it("should get all steps", async () => {
    const data = await new CreateStepService(inMemoryStepsRepository).execute(
      fakeStep({})
    );

    const response = await getStepsService.execute();
    expect(response).toBeTypeOf("object");
    expect(response).toHaveLength(1);
    expect(response[0]).toEqual(
      expect.objectContaining({
        ...data,
      })
    );
  });
});
