import logger from "../loggers/logger.js";
import { OrdersModel } from "../models/orderModel.js";

async function persisteOrder(data) {

    try {
      const {usrMail, usrMsg, date} = data;
      const newMsg = new OrdersModel(data);
      newMsg.usrMail = usrMail;
      newMsg.usrMsg = usrMsg;
      newMsg.date = date;
      await newMsg.save();
      return newMsg;
      
  } catch (error) {
    logger.error(`ERROR AL INTENTAR PERSISTIR ORDEN: ${error} `);
  }
}

async function leerOrdenes() {
    
    try {
        const mensajes = await OrdersModel.find({})
        return mensajes
    } catch (error) {
        logger.error(`ERROR AL INTENTAR LEER ORDENES: ${error} `)
  }
}

export {persisteOrder, leerOrdenes}