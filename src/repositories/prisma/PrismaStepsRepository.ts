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
  async findAll(): Promise<Step[]> {
    const step = await prisma.steps.findMany();
    return step;
  }
  async update({
    id,
    name,
    isInitial,
    type,
    form,
    message,
  }: Step): Promise<Step> {
    const step = await prisma.steps.update({
      where: { id },
      data: { form, name, type, isInitial, message },
    });
    return step;
  }
  async findById({ id }: Step): Promise<Step | null> {
    const step = await prisma.steps.findUnique({ where: { id } });
    return step;
  }
}

export { PrismaStepsRepository };
