import { IStepsRepositories } from "../../repositories/IStepsRepositories";

class GetStepService {
  constructor(private prismaStepsRepository: IStepsRepositories) {}
  async execute() {
    const response = await this.prismaStepsRepository.findAll();
    return response;
  }
}

export { GetStepService };
