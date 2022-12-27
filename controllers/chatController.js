import logger from "../loggers/logger.js";
import { chatModel } from "../models/chatModel.js";

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

/* function chat(socket) {
  
  logger.info(`¡Nuevo cliente conectado!`)
  socket.emit("mensaje", mensajes);

  socket.on("mensaje", (data) => {
    try {

        try {
          mensajes.push(data);
          socket.emit("mensaje", mensajes);
        } catch (error) {
          logger.error(`ERROR AL INTENTAR ENVIAR CHAT: ${data}:  ${error} `);
        }
        
    } catch (error) {
        logger.error(`ERROR AL INTENTAR ENVIAR CHAT: ${data}:  ${error} `);
    };


  });

};
 */
async function leerMsgs() {
  let mensajes=[];
  try {
    mensajes = await chatModel.find({})
    return mensajes
  } catch (error) {
    logger.error(`ERROR AL INTENTAR LEER CHAT: ${error} `)
  }
};

async function guardarMsgs(data) {
  try {
    const {usrMail, usrMsg, date} = data;
    const newMsg = new chatModel(data);
    newMsg.usrMail = usrMail;
    newMsg.usrMsg = usrMsg;
    newMsg.date = date;
    await newMsg.save()
    return newMsg
  } catch (error) {
    logger.error(`ERROR AL INTENTAR GUARDAR CHAT: ${error} `)
  }
};

export {chat, chat2}