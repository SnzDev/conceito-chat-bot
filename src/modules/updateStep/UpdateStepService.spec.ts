import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryStepsRepository } from "../../repositories/in-memory/InMemoryStepsRepository";
import { fakeStep } from "../../utils/mockDataVitest";
import { UpdateStepService } from "./UpdateStepService";

describe("Update Step Service", () => {
  let inMemoryStepsRepository: InMemoryStepsRepository;
  let updateStepService: UpdateStepService;

  beforeAll(() => {
    inMemoryStepsRepository = new InMemoryStepsRepository();
    updateStepService = new UpdateStepService(inMemoryStepsRepository);
  });

  it("should be able to update a step", async () => {
    const step = await inMemoryStepsRepository.create(
      fakeStep({ type: "MESSAGE" })
    );

    const stepUpdated = await updateStepService.execute({
      ...fakeStep({ type: "VCARD" }),
      id: step.id,
    });

    expect(step.id).toBe(stepUpdated.id);
    expect(stepUpdated.name).not.toBe(step.name);
    expect(stepUpdated.message).not.toBe(step.message);
    expect(stepUpdated.type).not.toBe(step.type);
  });

  it("should not be able to update a step with invalid id", async () => {
    await expect(
      updateStepService.execute({
        ...fakeStep({}),
        id: "invalid_id",
      })
    ).rejects.toThrowError("Fluxo inexistente!");
  });
});
