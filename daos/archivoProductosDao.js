import ContenedorArchivo from "../contenedores/archivoContenedor.js";
import conexion from "../config/config.js";

const ruta=conexion.archivo.ruta + "/productos.json";

const prods=[];

class ProductosDao extends ContenedorArchivo {
    constructor(){
        super (prods, ruta)
    }
}

export default ProductosDao