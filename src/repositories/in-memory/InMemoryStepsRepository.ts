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
  async findById({ id }: Step): Promise<Step | null> {
    const data = this.steps.find((value) => value.id === id);
    return data ?? null;
  }

  async update({ id, ...step }: Step): Promise<Step> {
    const data = this.steps.findIndex((value) => value.id === id);
    return (this.steps[data] = { ...this.steps[data], ...step });
  }

  async delete({ id }: Partial<Step>): Promise<void> {
    const data = this.steps.findIndex((value) => value.id === id);
    this.steps.splice(data, 1);
  }
}

export { InMemoryStepsRepository };
