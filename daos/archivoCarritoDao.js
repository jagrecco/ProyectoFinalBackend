import ContenedorArchivo from "../contenedores/archivoContenedor.js"

import conexion from "../config/config.js"

const ruta=conexion.archivo.ruta + "/carritos.json";


const carrito = []

class carritoDao extends ContenedorArchivo {

    constructor(){
        super (carrito, ruta) //
    }

    async agregarProducto(idCarrito, producto){

        if (this.col.length === 0) {return ({"Error" : "No hay Carritos"})}
        const indexCart = this.col.findIndex(el => el.id == idCarrito)
        if (indexCart == -1) {return ({ error: 'Carrito no encontrado' })}


        this.col[indexCart].productos.push(producto)
        await this.persiste(this.col)
        return "Producto Agregado"

    }

    async eliminarProducto(idCarrito, idProducto){

        if (this.col.length === 0) {return ({"Error" : "No hay Carritos"})}
        const indexCart = this.col.findIndex(el => el.id == idCarrito)
        if (indexCart == -1) {return ({ error: 'Carrito no encontrado' })}

        const productos = this.col[indexCart].productos
        const indexProduct = productos.findIndex(el => el.id == idProducto)
        if (indexProduct == -1) {
            return ({ error: 'Producto no encontrado' })
        }

        this.col[indexCart].productos.splice(indexProduct, 1)
        await this.persiste(this.col)
        return "Producto Eliminado"

    }

}

export default carritoDao