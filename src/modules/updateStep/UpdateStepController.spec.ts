import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../app";
import { fakeStep } from "../../utils/mockDataVitest";

describe("Update Step Controller", () => {
  it("should update a step", async () => {
    const step = await request(app)
      .post("/steps")
      .send(fakeStep({ type: "MESSAGE" }));

    const stepUpdated = await request(app)
      .put(`/steps/${step.body.id}`)
      .send(fakeStep({ type: "VCARD" }));

    expect(step.body).toHaveProperty("id");
    expect(stepUpdated.body).toHaveProperty("id");
    expect(stepUpdated.statusCode).toBe(200);
    expect(step.body.id).toBe(stepUpdated.body.id);
    expect(stepUpdated.body.name).not.toBe(step.body.name);
    expect(stepUpdated.body.message).not.toBe(step.body.message);
    expect(stepUpdated.body.type).not.toBe(step.body.type);
  });

  it("should not update a step with invalid id", async () => {
    const stepUpdated = await request(app)
      .put(`/steps/invalid_id`)
      .send(fakeStep({}));

    expect(stepUpdated.statusCode).toBe(400);
    expect(stepUpdated.body.message).toBe("Fluxo inexistente!");
  });

  it("should not update a step without id", async () => {
    const stepUpdated = await request(app).put(`/steps/`).send(fakeStep({}));

    expect(stepUpdated.statusCode).toBe(404);
  });
});
