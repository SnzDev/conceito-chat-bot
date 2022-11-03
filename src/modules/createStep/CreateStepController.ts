import { NextFunction, Request, Response } from "express";
import { CreateStepService } from "./CreateStepService";

export class CreateStepController {
  constructor(private createStep: CreateStepService) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const { name, type, isInitial, message, form } = request.body;

    try {
      const data = await this.createStep.execute({
        name,
        type,
        isInitial,
        message,
        form,
      });
      response.json(data);
    } catch (e) {
      next(e);
    }
  }
}
