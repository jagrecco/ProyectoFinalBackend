import ProductosDao from "./daos/archivoProductosDao.js"
/* const ProductosDao = require ("./daos/mongoProductosDao.js") */
/* import prodSchema from "./models/productoSchema.js"
/* const prodSchema =  require ("./models/productoSchema.js") */

const productos = new ProductosDao()

const obj={
    nombre: 'Escuadra',
    descripcion: 'Escuadra plástica',
    precio: 890,
    foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    stock: 100,
    codigo: 'AAB123',
    timestamp: { _seconds: 1662331498, _nanoseconds: 907000000 },
    id: 'XqolfwrM7sdqhcfL0d6B'
}

const obj2={
    nombre: 'Escuadra Mágica',
    descripcion: 'Escuadra plástica magia',
    precio: 890,
    foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    stock: 100,
    codigo: 'AAB123',
    timestamp: { _seconds: 1662331498, _nanoseconds: 907000000 },
    id: 'XqolfwrM7sdqhcfL0d6B'
}
/* let mensaje */

/* const listado = await productos.listarTodos()
console.log(listado)
console.log(listado.length + " documentos.") */



/* const listado = await productos.listarUno("kpFyf4XSSyx7uPNmxAtw")
console.log(listado) */
/* console.log(listado.length + " productos!!")

/* const listado = await productos.borrarUno("631507f28173400694f408c7")
console.log(listado.acknowledged)
console.log("_ID: 631507f28173400694f408c7 borrado") */

const insertarUno = await productos.guardarUno(obj2)
console.log("Insertó?")
console.log(insertarUno)


/* const uno= await productos.listarUno("1")
console.log(uno) */

/* const ob={
    nombre: "Regla simple de madera",
    descripcion: "Regla 30cm",
    codigo: "12ABD34",
    foto: "https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU",
    precio: 250,
    stock: 100
    
} */



/* const borrarUno = await productos.borrarUno("1")
console.log(borrarUno) */


/* const listado = await productos.listarTodos()
console.log(listado)
console.log(listado.length + " documentos.") */

/* const idProducto={
    _id:"631524281026a605feeaee09",   // mongodb
} */
/* const ob={
    descripcion: 'Portalápices plástico clásico',
    codigo:'0A0B0C0D0'
}
const idProducto="fPU8XXr1u0tGljx8Mdpc" // para firestore

const editaUno = await productos.editaUno(idProducto, ob)
console.log("Modificó!")
console.log(editaUno) */

/* const editaUno = await productos.editaUno(1, obj2)
console.log("Modificó!")
console.log(editaUno) */


const listado = await productos.listarTodos()
console.log(listado)
console.log(listado.length + " documentos.")
/* await productos.terminaConexion(); */