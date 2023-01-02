import ContenedorMongo from "../contenedores/mongoDbContenedor.js"
import CarrModel from "../models/carritoSchema.js"

class CarritoMongoDao extends ContenedorMongo {
    constructor(){
        super (CarrModel)
    }

    async agregarProducto(idCarrito, producto){

        const nuevoCarro={}

        try {
            
            const carro = await this.buscarCarro(idCarrito)
                try {
                    
                    if (carro.length==0) {
                       
                        nuevoCarro.idUsuario=idCarrito;
                        nuevoCarro.productos=[];
                        nuevoCarro.productos.push(JSON.parse(producto))
                    
                        const nuevoCarrito=this.col(nuevoCarro)
                        await nuevoCarrito.save()

                    } else {

                        const arrayProductos=carro[0].productos

                        const prod=JSON.parse(producto);

                        const index=arrayProductos.findIndex(el => el.codigo == prod.codigo);

                        if (index!=-1) {
                            arrayProductos[index].cantidad++;
                            arrayProductos[index].precio=arrayProductos[index].precio + parseInt(prod.precio);
                        } else {
                            arrayProductos.push(prod);
                        }

                        // arrayProductos.push(prod);

                        await this.col.updateOne({idUsuario: idCarrito}, {$set: {productos: arrayProductos} })
                            try {
                                console.log(`Producto agregado al carrito ${idCarrito}`);
                            } catch (error) {
                                console.log(`Error al actualizar carrito ${idCarrito}: ${error}`);
                            }
                    }
                    
                } catch (error) {
                    console.log("Error al conectar a la fuente de datos: " + error);
                }

        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async eliminarProducto(idCarrito, idProducto){

        const carro = await this.buscarCarro(idCarrito);

        const arrayProductos=carro[0].productos.filter(el => el._id != idProducto);

        await this.col.updateOne({idUsuario: idCarrito}, {$set: {productos: arrayProductos} })
            try {
                console.log(`Producto eliminado del carrito ${idCarrito}`);
                return arrayProductos;
            } catch (error) {
                console.log(`Error al actualizar carrito ${idCarrito}: ${error}`);
            }
    }

    async buscarCarro(idCarrito) {
        try {
            return await this.col.find({idUsuario: idCarrito});
        } catch (error) {
            console.log("Error al conectar a la fuente de datos: " + error)
        }
    }
}

export default CarritoMongoDao