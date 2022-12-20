import logger from "../loggers/logger.js";
import mongoose from "mongoose";

import { config } from 'dotenv';

if (process.env.NODE_ENV === 'dev'){
  config()
}

let instance = null;

class MongoSingleton {

  constructor() {
    this.db = mongoose.connect(process.env.MONGOURI, {dbName: process.env.DATABASENAME}).then(
        () => {
            logger.info(`Conexion a MongoDB exitosa: DB ${process.env.DATABASENAME}`)
        },
        err => {
            logger.error(`DB Mongo: Error al conectar a  ${process.env.DATABASENAME}:  ${err} `)
        }
    );
  }

  static getInstance() {
    if (!instance) {
      instance = new MongoSingleton();
    }
    return instance;
  }
  
}

export default MongoSingleton;