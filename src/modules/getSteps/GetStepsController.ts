import { Request, Response, NextFunction } from "express";
import { GetStepsService } from "./GetStepsService";

class GetStepsController {
  constructor(private getStepsService: GetStepsService) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await this.getStepsService.execute();
      return response.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export { GetStepsController };
