import { describe, it, expect, beforeAll } from "vitest";
import { InMemoryStepsRepository } from "../../repositories/in-memory/InMemoryStepsRepository";
import { CreateStepService } from "./CreateStepService";

import { IStepsRepositories } from "../../repositories/IStepsRepositories";
import { fakeStep } from "../../utils/mockDataVitest";

describe("Create Step Service", () => {
  let stepsRepository: IStepsRepositories;
  let createStep: CreateStepService;

  beforeAll(() => {
    stepsRepository = new InMemoryStepsRepository();
    createStep = new CreateStepService(stepsRepository);
  });

  it("should be able to create a new step", async () => {
    const mock = fakeStep({});
    const data = await createStep.execute(mock);

    expect(data).toHaveProperty("id");
    expect(data.name).toBe(mock.name);
  });

  it("should not be able to create two initial steps", async () => {
    await createStep.execute(fakeStep({ isInitial: true }));
    await expect(
      createStep.execute(fakeStep({ isInitial: true }))
    ).rejects.toThrow("Já existe um fluxo de inicio!");
  });

  it("should not be able to create when inputs are empty", async () => {
    const err = "Faltando parâmetros!";
    await expect(
      createStep.execute({ ...fakeStep({}), name: "" })
    ).rejects.toThrow(err);
    await expect(
      createStep.execute({ ...fakeStep({}), form: "" })
    ).rejects.toThrow(err);
    await expect(
      createStep.execute({ ...fakeStep({}), message: "" })
    ).rejects.toThrow(err);
    await expect(
      createStep.execute({ ...fakeStep({}), type: "" })
    ).rejects.toThrow(err);
  });
});
