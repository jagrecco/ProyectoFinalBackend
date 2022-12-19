import fs from "fs";

/* import { list, save as _save, persiste, getById as _getById, deleteById as _deleteById, changeById as _changeById } from "../utils/productos.js"; */
import { list, save, getById, deleteById, changeById, persiste } from "../utils/productos.js";

class Products { 
  
  static getAll() {
    const allProducts = list()
    return allProducts
  }

  static save(object) {
    const idProduct = save(object);
    persiste(object)
    
    return idProduct
  }
  
  static getById (x) {    
    const data = getById(x);
    return data;
  }  
  
  static deleteById (x) {
    const data = deleteById(x);
    return data;
  } 

  static changeById (x, object) {
    const data = changeById(x, object);
    return data;
  }

} 

export default Products;