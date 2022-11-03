import { Step } from "../../entities/Step";
import { IStepsRepositories } from "../IStepsRepositories";

import { prisma } from "../../database/prisma";

class PrismaStepsRepository implements IStepsRepositories {
  async existsInitial(): Promise<boolean> {
    const step = await prisma.steps.findFirst({ where: { isInitial: true } });
    return !!step;
  }
  async create({ name, isInitial, type, form, message }: Step): Promise<Step> {
    const step = await prisma.steps.create({
      data: { form, name, type, isInitial, message },
    });
    return step;
  }
}

export { PrismaStepsRepository };
