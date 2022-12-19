import ContenedorFirebase from "../contenedores/firebaseContenedor.js"

class CarritoDao extends ContenedorFirebase {
    constructor(){
        super ('carritos')
    }

    async agregarProducto(idCarrito, producto){

        try {

            const data = await super.listarUno(idCarrito)
            const arrProd = data.productos
            arrProd.push(producto)
            data.productos=arrProd
            return await super.editaUno(idCarrito, data)

        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async eliminarProducto(idCarrito, idProducto){

        try {

            const data = await super.listarUno(idCarrito)
            const nuevoArr =  data.productos.filter(el => el.id != idProducto)
            data.productos =  nuevoArr //arrProd.splice(indexProduct, 1)  //arrModific
            return await super.editaUno(idCarrito, data)

        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }
}

export default CarritoDao