import logger from "../loggers/logger.js";

import { persisteChat, leerChat } from "../daos/chatDao.js";

let mensajes=[];

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

export { leer, guardar };