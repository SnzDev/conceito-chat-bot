import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { PrismaStepsRepository } from "../../repositories/prisma/PrismaStepsRepository";
import { GetStepsService } from "./GetStepsService";
import { app } from "../../app";

describe("Get Steps Controler", () => {
  let stepsRepository: PrismaStepsRepository;
  let getStepsService: GetStepsService;

  beforeAll(() => {
    stepsRepository = new PrismaStepsRepository();
    getStepsService = new GetStepsService(stepsRepository);
  });

  it("should get all steps", async () => {
    const data = await request(app).get("/steps").send();

    expect(data.status).toBe(200);
    expect(data).toBeTypeOf("object");
  });
});
