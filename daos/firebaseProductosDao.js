import ContenedorFirebase from "../contenedores/firebaseContenedor.js"

class ProductosDao extends ContenedorFirebase {
    constructor(){
        super ('productos')
    }
}

export default ProductosDao