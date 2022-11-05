import { Step } from "../../entities/Step";
import { IStepsRepositories } from "../../repositories/IStepsRepositories";

export class CreateStepService {
  constructor(private stepsRepository: IStepsRepositories) {}

  async execute({ name, type, message, form, isInitial }: Step) {
    if (!name || !type || !message || !form)
      throw new Error("Faltando parâmetros!");
    if (isInitial) {
      const existsInitial = await this.stepsRepository.existsInitial();
      if (existsInitial) throw new Error("Já existe um fluxo de inicio!");
    }
    const step = Step.create({
      form:JSON.stringify(form),
      isInitial,
      message,
      name,
      type,
    });
    const data = await this.stepsRepository.create(step);

    return data;
  }
}
