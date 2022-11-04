import { IStepsRepositories } from "../../repositories/IStepsRepositories";

class GetStepsService {
  constructor(private stepsRepository: IStepsRepositories) {}
  async execute() {
    const response = await this.stepsRepository.findAll();
    return response;
  }
}

export { GetStepsService };
