/* import conexion from "../config/config.js" */

let id = 0;
/* const prods=[] */  //conexion.memoria.productos;] //cambio todos los prods por this.col

class ContenedorMemoria{
    
    constructor(col){

        this.col = col

    }

    async listarTodos(){
        
        return this.col;

    }

    async listarUno(idProducto){
        if (this.col.length === 0) {return ({"Error" : "Archivo Vacio"})} 
        return (this.col.find(el => el.id == idProducto) || { error: 'Producto no encontrado' })  
    }

    async guardarUno(objeto) {
        id ++
        const timestamp = new Date().getTime();
        objeto.id = id 
        objeto.timestamp = timestamp 
        this.col.push(objeto)
        return objeto
        
    }

    async borrarUno(idProducto){

        const index = this.col.findIndex(x => x.id == idProducto)
        console.log(index)
        console.log(this.col)
        if (index == -1) {
          return ({ error: 'Producto no encontrado' })
        }  
        this.col.splice(index, 1);
        
        return "Producto Eliminado"

    }

    async editaUno(idProducto, objeto) {
        
        const index = this.col.findIndex(x => x.id == idProducto)
        if (index == -1) {
            return ({ error: 'Producto no encontrado' });
        }  
        objeto.id = idProducto;
        objeto.timestamp = prods[index].timestamp;
        this.col[index] = objeto;
        
        return "Producto Reemplazado";

    }

}

export default ContenedorMemoria