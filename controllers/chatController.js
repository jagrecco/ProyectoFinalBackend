import logger from "../loggers/logger.js";
import { chatModel } from "../models/chatModel.js";

let mensajes=[]

leerMsgs();

function chat(socket) {

    logger.info(`¡Nuevo cliente conectado!`)
    socket.emit("mensajes", mensajes);
  
    socket.on("mensaje", (data) => {
      try {
        
        mensajes.push(data);
        socket.emit("mensajes", mensajes);
        guardarMsgs(mensajes); //Guarda mensajes en mongo;

      } catch (error) {
        logger.error(`ERROR AL INTENTAR ENVIAR CHAT: ${data}:  ${error} `);
      }
    });

};

async function leerMsgs() {
    try {
      mensajes = await chatModel.find({})
      return mensajes
    } catch (error) {
      logger.error(`ERROR AL INTENTAR LEER CHAT: ${error} `)
    }
};
  
async function guardarMsgs(data) {
    try {
      const newMsg = new chatModel(data)
      await newMsg.save()
      return newMsg
    } catch (error) {
      logger.error(`ERROR AL INTENTAR GUARDAR CHAT: ${error} `)
    }
};

export {chat}