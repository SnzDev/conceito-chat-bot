import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../app";
import { fakeStep } from "../../utils/mockDataVitest";

describe("DeleteStepFactory", () => {
  it("should be able to create a step", async () => {
    const response = await request(app).post("/steps/").send(fakeStep({}));
    expect(response.status).toBe(201);
    const data = await request(app).delete(`/steps/${response.body.id}`);
    expect(data.status).toBe(204);
  });

  it("should not be able to delete a step if not exists", async () => {
    const response = await request(app).delete(`/steps/inexistent-id`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Fluxo não encontrado!");
  });
});
