import logger from "../loggers/logger.js";
import { chatModel } from "../models/chatModel.js";

async function persisteChat(data) {
    try {
      const {usrMail, usrMsg, date} = data;
      const newMsg = new chatModel(data);
      newMsg.usrMail = usrMail;
      newMsg.usrMsg = usrMsg;
      newMsg.date = date;
      await newMsg.save();
      return newMsg;
  } catch (error) {
    logger.error(`ERROR AL INTENTAR PERSISTIR CHAT: ${error} `);
  }
}

async function leerChat() {
    
    try {
        const mensajes = await chatModel.find({})
        return mensajes
    } catch (error) {
        logger.error(`ERROR AL INTENTAR LEER CHAT: ${error} `)
  }
}

export {persisteChat, leerChat}