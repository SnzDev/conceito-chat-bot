import { Router } from "express";
import { createStepFactory } from "../modules/createStep/CreateStepFactory";
import { DeleteStepFactory } from "../modules/deleteStep/DeleteStepFactory";
import { getStepsFactory } from "../modules/getSteps/GetStepsFactory";
import { UpdateStepFactory } from "../modules/updateStep/UpdateStepFactory";

const routes = Router();

routes.post("/steps", (request, response, next) =>
  createStepFactory().handle(request, response, next)
);

routes.get("/steps", (request, response, next) =>
  getStepsFactory().handle(request, response, next)
);

routes.put("/steps/:id", (request, response, next) =>
  UpdateStepFactory().handle(request, response, next)
);

routes.delete("/steps/:id", (request, response, next) =>
  DeleteStepFactory().handle(request, response, next)
);

export { routes };
