import { Request, Response, NextFunction } from "express";
import { DeleteStepService } from "./DeleteStepService";

class DeleteStepController {
  constructor(private deleteStepService: DeleteStepService) {}
  async handle(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    try {
      await this.deleteStepService.execute({ id });
      response.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}
export { DeleteStepController };
