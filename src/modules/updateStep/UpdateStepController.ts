import { NextFunction, Request, Response } from "express";
import { UpdateStepService } from "./UpdateStepService";

class UpdateStepController {
  constructor(private updateService: UpdateStepService) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const { form, isInitial, message, name, type } = request.body;
    const { id } = request.params;

    try {
      const data = await this.updateService.execute({
        id,
        form,
        isInitial,
        message,
        name,
        type,
      });
      response.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export { UpdateStepController };
