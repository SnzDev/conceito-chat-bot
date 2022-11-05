import { IStepsRepositories } from "../../repositories/IStepsRepositories";

interface DeleteStepServiceDTO {
  id: string;
}

class DeleteStepService {
  constructor(private stepsRepository: IStepsRepositories) {}

  public async execute({ id }: DeleteStepServiceDTO): Promise<void> {
    const step = await this.stepsRepository.findById({ id });

    if (!step) throw new Error("Fluxo não encontrado!");

    await this.stepsRepository.delete(step);
  }
}

export { DeleteStepService };
