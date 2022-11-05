import { PrismaStepsRepository } from "../../repositories/prisma/PrismaStepsRepository";
import { DeleteStepController } from "./DeleteStepController";
import { DeleteStepService } from "./DeleteStepService";

const DeleteStepFactory = () => {
  const stepsRepository = new PrismaStepsRepository();
  const deleteStepService = new DeleteStepService(stepsRepository);
  const deleteStepController = new DeleteStepController(deleteStepService);
  return deleteStepController;
};

export { DeleteStepFactory };
