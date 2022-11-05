import { PrismaClient } from "@prisma/client";
import { Buttons, List } from "whatsapp-web.js";
import { ModelInstance } from "./modelInstance";
import { saveChatHistory } from "./src/utils/save-chat-history";
import { SaveIfHaveFile } from "./src/utils/save-file";

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
instance.on("message_create", async (msg) => {
  if (msg.isStatus || msg.author || msg.fromMe) return;
  console.log("atualizando");
  let step;
  await saveChatHistory(msg);
  await SaveIfHaveFile(msg);
  // if (msg.body === "!lista") {
  //   let sections = [
  //     {
  //       title: "Secton title",
  //       rows: [
  //         { title: "ListItem1", description: "desc" },
  //         { title: "Try clicking me (id: test)", id: "test" },
  //       ],
  //     },
  //   ];
  //   const list = new List(
  //     "Lista teste",
  //     "btnText",
  //     sections,
  //     "titleTest",
  //     "footerTest"
  //   );
  //   await instance.sendMessage(msg.from, list);
  // }

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

  if (step.type === "MESSAGE") {
    await msg.react("👍");

    //@ts-ignore
    return await instance.sendMessage(msg.from, step.message);
  }
  if (step.type === "BUTTONS") {
    await msg.react("👍");
    const buttons = JSON.parse(step.form)?.map(
      ({
        buttonName,
        buttonToStep,
      }: {
        buttonName: string;
        buttonToStep: string;
      }) => {
        return { id: buttonToStep, body: buttonName };
      }
    );
    if (!buttons) return;
    //@ts-ignore
    const body = new Buttons(step.message, buttons);
    return await instance.sendMessage(msg.from, body);
  }
});
