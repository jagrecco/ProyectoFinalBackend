import fs from "fs";
import conexion from "../config/config.js"

const ruta=conexion.archivo.ruta + "/productos.json";

let id = 0;
/* let prods=[] */

class ContenedorArchivo{
    constructor(col, ruta){

      this.col = col
      this.ruta=ruta
        
    }

    async listarTodos(){

      try {
        
        await this.leedata();
        return this.col;

      }
      catch (error) {
        console.log("Error al conectar a la fuente de datos: " + error)
      }

    }

    async listarUno(idProducto){

      try {
        
        await this.leedata();
        if (this.col.length === 0) {return ({"Error" : "Archivo Vacio"})} 
        return (this.col.find(el => el.id == idProducto) || { error: 'Producto no encontrado' })  

      }
      catch (error) {
        console.log("Error al conectar a la fuente de datos: " + error)
      }
    }

    async guardarUno(objeto) {

      try {
        
        id ++;
        const timestamp = new Date().getTime();
        objeto.id = id;
        objeto.timestamp = timestamp;
        this.col.push(objeto);
        
        await this.persiste(this.col);
        return this.col;

      }
      catch (error) {
        console.log("Error al conectar a la fuente de datos: " + error)
      }

    }

    async borrarUno(idProducto){

      try {
        
        const index = this.col.findIndex(x => x.id == idProducto);  
        if (index == -1) {
          return ({ error: 'Producto no encontrado' });
        }  
        this.col.splice(index, 1);
        await this.persiste(this.col);
        return "Producto Eliminado"

      }
      catch (error) {
        console.log("Error al conectar a la fuente de datos: " + error)
      }

    }

    async editaUno(idProducto, objeto) {

      try {
        
        const index = this.col.findIndex(x => x.id == idProducto)
        if (index == -1) {
            return ({ error: 'Producto no encontrado' });
        }  
        objeto.id = idProducto;
        objeto.timestamp = prods[index].timestamp;
        this.col[index] = objeto;        
        await this.persiste(this.col);
        return "Producto Reemplazado";

      }
      catch (error) {
        console.log("Error al conectar a la fuente de datos: " + error)
      }

    }

    /* persiste = async()=>{ */
    async persiste(arr) {

      try {
    
        await fs.promises.writeFile(this.ruta, JSON.stringify(arr, null, 2))
        
      }
      catch(error){
        console.log(`Problemas al acceder al archivo ` + error)
      }
    }

    async leedata (){
      
      try {
        this.col = JSON.parse(await fs.promises.readFile(this.ruta,"utf-8"), null, 2)
        const cantidad = this.col.length
        id=this.col[cantidad-1].id
      }
      catch (error) {
        console.log("Archivo de productos no encontrado " + error);
      }
    }


}

/* const persiste = async()=>{

    try {
  
      await fs.promises.writeFile(ruta, JSON.stringify(prods, null, 2))
      
    }
    catch(error){
      console.log(`Problemas al acceder al archivo ` + error)
    }
}
  

const leedata = async()=>{
    
    try {
      prods = JSON.parse(await fs.promises.readFile(ruta,"utf-8"), null, 2) //*
      id=prods[length-1].id
    }
    catch (error) {
      console.log("Archivo de productos no encontrado " + error);
    }
  } */

export default ContenedorArchivo