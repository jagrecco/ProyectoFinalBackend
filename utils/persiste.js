import { promises } from "fs";

async function persistir(objeto, archivo){
		
    /* try {
        contenido = await fs.promises.readFile(archivo,"utf-8")
    }
    catch {
        fs.writeFileSync("productos.json", "")
        const contenido=""
        id=1
    }
    
    console.log(contenido)
    const productos = JSON.parse(contenido)
    const largo=productos.length
    console.log(largo)
    console.log((id))

    if (id!=1 && largo!=0) {id=productos(largo-1).id}

    console.log((id)) */

    try {
        
        await promises.appendFile(archivo, `,${JSON.stringify(objeto,null,2)}`)
        console.log("exito6")
    }
    catch(err){
        console.log(`Problemas al acceder al archivo`)
    }
}

export default persistir;