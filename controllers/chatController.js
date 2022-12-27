import logger from "../loggers/logger.js";
import { chatModel } from "../models/chatModel.js";

import { persisteChat, leerChat } from "../daos/chatDao.js";

let mensajes=[];

/* leerMsgs(); */

function chat2(datos) {
  const {socket, mensajes} = datos;
  logger.info(`¡Nuevo cliente conectado!`);

  socket.emit("mensaje", mensajes);

  socket.on("mensaje", (data) => {

    mensajes.push(data)
    socket.emit("mensaje", mensajes);

  });
}

async function chat(data) {
  
  mensajes.push(data)
  io.sockets.emit("mensaje", mensajes);
}

async function leer() {
  try {
    mensajes = leerChat();
    return mensajes
  } catch (error) {
    logger.error(`ERROR AL INTENTAR LEER CHAT: ${error} `)
  }
};

async function guardar(data) {
  
  try {
    persisteChat(data);
  } catch (error) {
    logger.error(`ERROR AL INTENTAR GUARDAR CHAT: ${error} `)
  }
};

export {leer, guardar};