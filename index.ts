import { PrismaClient } from "@prisma/client";
import { Buttons } from "whatsapp-web.js";
import { ModelInstance } from "./modelInstance";

const prisma = new PrismaClient();
const instance = ModelInstance("snz");
instance.initialize();

instance.on("qr", (qr) => {
  console.log("QRCODE");
});
instance.on("loading_screen", (loading) => {
  console.log("LOADING: " + loading);
});
instance.on("ready", () => {
  console.log("READY");
});
instance.on("message", async (msg) => {
  if (msg.isStatus || msg.author) return;
  console.log("atualizando");
  let step;

  if (msg.type === "buttons_response") {
    const idNewStep = msg.selectedButtonId;
    await prisma.clients.update({
      where: { client: msg.from },
      data: { stepsId: idNewStep },
      include: { step: true },
    });
  }

  const client = await prisma.clients.findFirst({
    where: { client: msg.from },
    include: { step: true },
  });

  if (client) {
    step = client?.step;
    if (!step) return;
  } else {
    step = await prisma.steps.findFirst({
      where: { isInitial: true },
    });
    if (!step) return;
    await prisma.clients.create({
      data: { stepsId: step.id, client: msg.from },
    });
  }

  if (step.type === "message") {
    await msg.react("👍");

    //@ts-ignore
    return await instance.sendMessage(msg.from, step.form?.message);
  }
  if (step.type === "buttons") {
    await msg.react("👍");

    //@ts-ignore
    const body = new Buttons(step.form?.message, step.form?.buttons);
    return await instance.sendMessage(msg.from, body);
  }
});
