import ContenedorMemoria from "../contenedores/memoriaContenedor.js"

import conexion from "../config/config.js"

const carrito =conexion.memoria.carrito
let id = 0;
class MemoriaDao extends ContenedorMemoria {

    constructor(){
        super (carrito) //
    }

    async listarCarros() {
        return carrito;
    }

    async guardarUno() { //guardar un Carrito
        const objeto={}
        
        id ++
        const timestamp = new Date().getTime();
        objeto.id = id
        objeto.timestamp = timestamp
        objeto.productos=[]
        carrito.push(objeto)
        return objeto

      }

    async agregarProducto(idCarrito, producto){

        if (carrito.length === 0) {return ({"Error" : "No hay Carritos"})}
        const indexCart = carrito.findIndex(el => el.id == idCarrito)
        if (indexCart == -1) {return ({ error: 'Carrito no encontrado' })}

        /* const products = await this.listarTodos() //productos.list() */
        /* const indexProduct = products.findIndex(el => el.id == idProducto)
        if (indexProduct == -1) {
            return ({ error: 'Producto no encontrado' })
        }  */

        carrito[indexCart].productos.push(producto)

        return "Producto Agregado"

    }

    async eliminarProducto(idCarrito, idProducto){

        if (carrito.length === 0) {return ({"Error" : "No hay Carritos"})}
        const indexCart = carrito.findIndex(el => el.id == idCarrito)
        if (indexCart == -1) {return ({ error: 'Carrito no encontrado' })}

        const productos = carrito[indexCart].productos
        const indexProduct = productos.findIndex(el => el.id == idProducto)
        if (indexProduct == -1) {
            return ({ error: 'Producto no encontrado' })
        }

        carrito[indexCart].productos.splice(indexProduct, 1)

        return "Producto Eliminado"

    }

}

export default MemoriaDao