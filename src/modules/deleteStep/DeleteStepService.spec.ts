import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryStepsRepository } from "../../repositories/in-memory/InMemoryStepsRepository";
import { fakeStep } from "../../utils/mockDataVitest";
import { DeleteStepService } from "./DeleteStepService";

describe("DeleteStepService", () => {
  let stepsRepository: InMemoryStepsRepository;
  let deleteStepService: DeleteStepService;
  beforeAll(() => {
    stepsRepository = new InMemoryStepsRepository();
    deleteStepService = new DeleteStepService(stepsRepository);
  });
  it("should delete a step", async () => {
    const data = await stepsRepository.create(fakeStep({}));
    expect(await (await stepsRepository.findAll()).length).toEqual(1);

    if (data.id) await deleteStepService.execute({ id: data.id });

    expect(await stepsRepository.findAll()).toEqual([]);
  });

  it("should not delete a step if not exists", async () => {
    await expect(
      deleteStepService.execute({ id: "inexistent-id" })
    ).rejects.toThrowError("Fluxo não encontrado!");
  });
});
