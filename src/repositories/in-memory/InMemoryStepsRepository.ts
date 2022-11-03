import { Step } from "../../entities/Step";
import { IStepsRepositories } from "../IStepsRepositories";
import crypto from "crypto";

class InMemoryStepsRepository implements IStepsRepositories {
  private steps: Step[] = [];

  async existsInitial(): Promise<boolean> {
    const step = this.steps.some((step) => step.isInitial);
    return step;
  }

  async create(step: Step): Promise<Step> {
    Object.assign(step, {
      id: crypto.randomUUID(),
    });

    this.steps.push(step);
    return step;
  }

  async findAll(): Promise<Step[]> {
    const step = this.steps;
    return step;
  }
}

export { InMemoryStepsRepository };
