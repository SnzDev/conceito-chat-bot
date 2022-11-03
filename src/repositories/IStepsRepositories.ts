import { Step } from "../entities/Step";

interface IStepsRepositories {
  existsInitial(): Promise<boolean>;
  create({ name, isInitial, type, form, message }: Step): Promise<Step>;
  findAll(): Promise<Step[]>;
}
export { IStepsRepositories };
