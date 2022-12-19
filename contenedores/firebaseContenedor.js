
import admin from "firebase-admin";
import conexion from "../config/config.js"

admin.initializeApp({
    credential: admin.credential.cert(conexion.firebase),
    databaseURL: "https://url-example.firebaseio.com",
});

const db = admin.firestore();
/* const query = db.collection("productos"); // este era el error al guardar*/

class ContenedorFirebase{
    constructor(coleccion){

        this.query = db.collection(coleccion)
        
    }

    async listarTodos(){
        try {
            const prods=[]
            const productos = (await this.query.get()).docs
    
            productos.forEach((doc)=>{
    
                const dato=doc.data()
                dato.id=doc.id
                prods.push (dato)
    
            })
            return prods;
        }
        catch (error) {
            console.log("Error al conectar a la fuente de datos: " + error)
        }
        
    }

    async listarUno(idProducto){
        try{
            const productos = await this.query.doc(idProducto).get();
            const prodRespuesta=productos.data()
            prodRespuesta.id=idProducto

            return prodRespuesta //productos.data();

        }
        catch(error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }
    }

    async guardarUno(objeto) {
        try {

            const res = await this.query.add(objeto)
            objeto.id=res.id
            return objeto;

        }
        catch (error) {
            console.log("Error al conectar a la fuente de datos: " + error)
        }
        
    }

    async borrarUno(idProducto){

        try {
            const res = await this.query.doc(idProducto).delete();
            return res;
        }
        catch(error) {
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async editaUno(idProducto, objeto) {
        
        try {
            const res = await this.query.doc(idProducto).update(objeto);
            return res;
        }
        catch(error) {
            console.log("Error al conectar a la fuente de datos: " + error)
        }
        
    }

    async terminaConexion(){
        
    }
}

export default ContenedorFirebase