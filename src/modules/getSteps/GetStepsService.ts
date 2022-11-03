import { IStepsRepositories } from "../../repositories/IStepsRepositories";

class GetStepsService {
  constructor(private prismaStepsRepository: IStepsRepositories) {}
  async execute() {
    const response = await this.prismaStepsRepository.findAll();
    return response;
  }
}

export { GetStepsService };
