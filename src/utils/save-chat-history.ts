import { PrismaClient } from "@prisma/client";
import { Message } from "whatsapp-web.js";
const prisma = new PrismaClient();

export async function saveChatHistory(msg: Message) {
  const {
    ack,
    author,
    body,
    deviceType,
    from,
    isForwarded,
    timestamp,
    to,
    type,
    vCards,
    fromMe,
    hasMedia,
    hasQuotedMsg,
    isEphemeral,
    isGif,
    links,
    mentionedIds,
    location,
  } = msg;

  const {
    hasReaction,
    isDynamicReplyButtonsMsg,
    quotedStanzaID,
    quotedParticipant,
    //@ts-ignore
  } = msg["_data"];

  const messageId = msg.id.id;
  try {
    const chatHistory = await prisma.chat_history.findFirst({
      where: { messageId },
    });
    if (chatHistory) return;
    await prisma.chat_history.create({
      data: {
        ack,
        author,
        body,
        deviceType,
        from,
        isForwarded,
        timestamp,
        to,
        type,
        vCards: JSON.stringify(vCards),
        fromMe,
        hasMedia,
        hasQuotedMsg,
        isEphemeral,
        isGif,
        links: JSON.stringify(links),
        mentionedIds: JSON.stringify(mentionedIds),
        messageId,
        hasReaction,
        isDynamicReplyButtonsMsg,
        quotedStanzaID,
        quotedParticipant,
        location: JSON.stringify({
          latitude: location?.latitude,
          longitude: location?.longitude,
          description: location?.description,
        }),
      },
    });
  } catch (err) {
    console.error(`SaveChatError: ${err}`);
  }
}
