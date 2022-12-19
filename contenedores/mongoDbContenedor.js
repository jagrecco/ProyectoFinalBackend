import mongoose from "mongoose";
import logger from "../loggers/logger.js";
import ProdModel from "../models/productoSchema.js"
import conexion from "../config/config.js"

class ContenedorMongo{
    constructor(col, esquema){

        this.col=col
        
    }

    async listarCategorias(){
        try {
            
            return await this.col.find({},{"category":1,"_id":0});
        }
        catch (error){
            logger.error(`Error al conectar a la fuente de datos: ${error}`)
        }
    }
    
    async listarTodos(cualCategoria){
        
        try {
            if (cualCategoria=='Todos'){
                return await this.col.find();    
            }

            return await this.col.find({"category":cualCategoria});
        }
        catch (error){
            logger.error(`Error al conectar a la fuente de datos: ${error}`)
        }
    }

    async listarUno(idProducto){

        try {
            return await this.col.find({_id: idProducto});
        }
        catch (error){
            logger.error(`Error al conectar a la fuente de datos: ${error}`)
        }

    }

    async guardarUno(objeto) {

        try {
            const productoNuevo=this.col(objeto)
            await productoNuevo.save()
            return objeto;
        }
        catch (error){
            logger.error(`Error al conectar a la fuente de datos: ${error}`)
        }

    }

    async borrarUno(idProducto){

        try {
            const productos = await this.col.deleteOne({_id: idProducto});
            return productos;
        }
        catch (error){
            logger.error(`Error al conectar a la fuente de datos: ${error}`)
        }

    }

    async editaUno(idProducto, objeto) {

        try {
            return this.col.findOneAndUpdate(idProducto, objeto, {new: true});
        }
        catch (error){
            logger.error(`Error al conectar a la fuente de datos: ${error}`)
        }

    }

    async terminaConexion(){

        try {
            await mongoose.connection.close();
        }
        catch (error){
            logger.error(`Error al terminar la conexión a la fuente de datos: ${error}`)
        }
    }
}

export default ContenedorMongo