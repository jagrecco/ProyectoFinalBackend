import logger from '../loggers/logger.js';

const log= (method, originalUrl, status) => {

    if (status != 404){
        logger.info(`Método: ${method} Ruta: ${originalUrl}`)
        return
    }
    logger.warn(`Método: ${method} Ruta inexistente: ${originalUrl}`)
}

export default log;