import { PrismaStepsRepository } from "../../repositories/prisma/PrismaStepsRepository";
import { CreateStepController } from "./CreateStepController";
import { CreateStepService } from "./CreateStepService";

export const createStepFactory = () => {
  const usersRepository = new PrismaStepsRepository();
  const createStep = new CreateStepService(usersRepository);
  const createStepController = new CreateStepController(createStep);
  return createStepController;
};
