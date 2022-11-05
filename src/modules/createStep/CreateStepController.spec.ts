/**
 * @vitest-environment ./prisma/prisma-environment
 */

import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../app";
import { fakeStep } from "../../utils/mockDataVitest";

describe("Create Step Controller", () => {
  it("should create a new step", async () => {
    const response = await request(app).post("/steps").send(fakeStep({}));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not create two initial instance", async () => {
    await request(app)
      .post("/steps")
      .send(fakeStep({ isInitial: true }));
    const response = await request(app)
      .post("/steps")
      .send(fakeStep({ isInitial: true }));
    expect(response.status).toBe(400);
    expect(response.body.message).equal("Já existe um fluxo de inicio!");
  });

  it("should not create with parameter empty", async () => {
    let response = await request(app)
      .post("/steps")
      .send({ ...fakeStep({}), name: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).equal("Faltando parâmetros!");

    response = await request(app)
      .post("/steps")
      .send({ ...fakeStep({}), form: "" });
    expect(response.status).toBe(400);
    expect(response.body.message).equal("Faltando parâmetros!");

    response = await request(app)
      .post("/steps")
      .send({ ...fakeStep({}), message: "" });
    expect(response.status).toBe(400);
    expect(response.body.message).equal("Faltando parâmetros!");

    response = await request(app)
      .post("/steps")
      .send({ ...fakeStep({}), type: "" });
    expect(response.status).toBe(400);
    expect(response.body.message).equal("Faltando parâmetros!");
  });
});
