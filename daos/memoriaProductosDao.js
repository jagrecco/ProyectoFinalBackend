import ContenedorMemoria from "../contenedores/memoriaContenedor.js"
import conexion from "../config/config.js"
const prods=conexion.memoria.productos

class ProductosDao extends ContenedorMemoria {
    constructor(){
        super (prods)
    }
}

export default ProductosDao