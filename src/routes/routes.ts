import { Router } from "express";
import { createStepFactory } from "../modules/createStep/CreateStepFactory";

const routes = Router();

routes.post("/steps", (request, response, next) =>
  createStepFactory().handle(request, response, next)
);

export { routes };
