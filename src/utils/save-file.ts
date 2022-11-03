import mime from "mime-types";
import { Message } from "whatsapp-web.js";
import fs from "fs";

export async function SaveIfHaveFile(msg: Message) {
  if (msg.hasMedia) {
    let folder = `./public/`;
    if (!fs.existsSync(folder)) {
      try {
        fs.mkdirSync(folder);
      } catch (e) {
        console.error(`DownloadMedia: ${e}`);
      }
    }
    const media = await msg.downloadMedia();
    if (media) {
      const format = mime.extension(media.mimetype);

      try {
        fs.writeFileSync(`${folder}/${msg.id.id}.${format}`, media.data, {
          encoding: "base64",
        });
        return `${folder}/${msg.id.id}.${format}`;
      } catch (e) {
        console.error(`DownloadMedia: ${e}`);
      }
    }
  }
}
