import { promises } from "fs";

let data = [];
let id = 0;

const list = () => {
  leedata()
  return data;
}  


const save = (object) => {
  id ++ 
  let timestamp = new Date().getTime();
  object.id = id 
  object.timestamp = timestamp 
  data.push(object)
  persiste(data)
  return object
}  


const getById = (x) => {    
  if (data.length === 0) {return ({"Error" : "Archivo Vacio"})} 
  return (data.find(el => el.id == x) || { error: 'Producto no encontrado' })  
}  

 
 const deleteById = (i) => {    
  let index = data.findIndex(x => x.id == i) 
  if (index == -1) {
    return ({ error: 'Producto no encontrado' })
  }  
  data.splice(index, 1);
  persiste(data)
  return "Producto Eliminado"
} 


 const changeById = (i, object) => { 
  let index = data.findIndex(x => x.id == i)
  if (index == -1) {
    return ({ error: 'Producto no encontrado' })
  }  
  object.id = i 
  object.timestamp = data[index].timestamp
  data[index] = object
  persiste(data)
  return "Producto Reemplazado"
}

const persiste = async()=>{

  try {

    await promises.writeFile("./utils/productos.json", JSON.stringify(data, null, 2))
    
  }
  catch(error){
    console.log(`Problemas al acceder al archivo ` + error)
  }
}

const leedata=async()=>{
  try {
    data = JSON.parse(await promises.readFile('./utils/productos.json',"utf-8"), null, 2) //*
  }
  catch (error) {
    console.log("Archivo de productos no encontrado " + error);
  }
}

export default { list, save, getById, deleteById, changeById, persiste };