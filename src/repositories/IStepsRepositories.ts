import { Step } from "../entities/Step";

interface IStepsRepositories {
  existsInitial(): Promise<boolean>;
  create({ name, isInitial, type, form, message }: Step): Promise<Step>;
  findAll(): Promise<Step[]>;
  findById({ id }: Partial<Step>): Promise<Step | null>;
  update({ id, name, isInitial, type, form, message }: Step): Promise<Step>;
  delete({ id }: Partial<Step>): Promise<void>;
}
export { IStepsRepositories };
