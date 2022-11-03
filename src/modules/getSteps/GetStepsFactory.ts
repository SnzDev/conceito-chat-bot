import { PrismaStepsRepository } from "../../repositories/prisma/PrismaStepsRepository";
import { GetStepsController } from "./GetStepsController";
import { GetStepsService } from "./GetStepsService";

export const getStepsFactory = () => {
  const prismaStepsRepository = new PrismaStepsRepository();
  const getStepsService = new GetStepsService(prismaStepsRepository);
  const getStepsController = new GetStepsController(getStepsService);
  return getStepsController;
};
