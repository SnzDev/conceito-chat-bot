import { Step } from "../../entities/Step";
import { IStepsRepositories } from "../../repositories/IStepsRepositories";

class UpdateStepService {
  constructor(private stepsRepository: IStepsRepositories) {}

  async execute({ id, form, isInitial, message, name, type }: Step) {
    const stepExists = await this.stepsRepository.findById({ id });
    if (!stepExists) throw new Error("Fluxo inexistente!");

    const step = await this.stepsRepository.update({
      id,
      form: JSON.stringify(form),
      isInitial,
      message,
      name,
      type,
    });

    return step;
  }
}

export { UpdateStepService };
