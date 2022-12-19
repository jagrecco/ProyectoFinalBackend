import ContenedorMongo from "../contenedores/mongoDbContenedor.js"
import ProdModel from "../models/productoSchema.js"

class ProductosDao extends ContenedorMongo {
    constructor(){
        super (ProdModel)
    }
}

export default ProductosDao