import logger from "../loggers/logger.js";
import mongoose from "mongoose";
import { config } from 'dotenv';

if (process.env.NODE_ENV === 'dev'){
  config()
}


export default mongoose.connect(process.env.MONGOURI, {dbName: process.env.DATABASENAME}).then(
    () => {
        logger.info(`Conexion a MongoDB exitosa: DB ${process.env.DATABASENAME}`)
    },
    err => {
        logger.error(`DB Mongo: Error al conectar a  ${process.env.DATABASENAME}:  ${err} `)
    }
);