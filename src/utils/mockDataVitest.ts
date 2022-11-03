import { Step } from "../entities/Step";
import { faker } from "@faker-js/faker";

export const fakeStep = ({
  name,
  isInitial,
  type,
  message,
  form,
}: Partial<Step>) => {
  return {
    name: name ?? faker.random.words(3),
    isInitial: isInitial ?? false,
    type:
      type ??
      faker.helpers.arrayElement([
        "MESSAGE",
        "BUTTONS",
        "LIST",
        "IMAGE",
        "VCARD",
        "LINK",
      ]),
    message: message ?? faker.lorem.lines(2),
    form: form ?? JSON.stringify({}),
  };
};
