import { Prisma } from "@prisma/client";

export class Step {
  id?: string;
  name: string;
  isInitial: boolean;
  type: string;
  message: string;
  form: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor({ name, isInitial, type, message, form }: Step) {
    this.name = name;
    this.isInitial = isInitial;
    this.type = type;
    this.form = form;
    this.message = message;
    return { name, isInitial, type, form, message };
  }

  static create({ name, isInitial, type, form, message }: Step) {
    const step = new Step({ name, isInitial, type, form, message });
    return step;
  }
}
