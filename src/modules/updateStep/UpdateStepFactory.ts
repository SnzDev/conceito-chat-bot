import { PrismaStepsRepository } from "../../repositories/prisma/PrismaStepsRepository";
import { UpdateStepController } from "./UpdateStepController";
import { UpdateStepService } from "./UpdateStepService";

export const UpdateStepFactory = () => {
  const stepsRepository = new PrismaStepsRepository();
  const updateService = new UpdateStepService(stepsRepository);
  const updateController = new UpdateStepController(updateService);

  return updateController;
};
