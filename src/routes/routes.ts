import { Router } from "express";
import { createStepFactory } from "../modules/createStep/CreateStepFactory";
import { getStepsFactory } from "../modules/getSteps/GetStepsFactory";

const routes = Router();

routes.post("/steps", (request, response, next) =>
  createStepFactory().handle(request, response, next)
);

routes.get("/steps", (request, response, next) =>
  getStepsFactory().handle(request, response, next)
);
export { routes };
