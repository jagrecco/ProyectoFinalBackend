import { create, addProduct as _addProduct, getById as _getById, deleteById as _deleteById, deletProduct as _deletProduct } from "../utils/carritos.js";

class Carts { 
  
  static createCart() {
    const newCartId = create()
    return newCartId
  }

  static addProduct(x, y) {
    const data = _addProduct(x, y);
    return data
  }
  
  static getById (x) {    
    const data = _getById(x);
    return data;
  }  
  
  static deleteById (x) {
    const data = _deleteById(x);
    return data;
  } 

  static deletProduct (x, y) {
    const data = _deletProduct(x, y);
    return data;
  }     

} 

export default Carts;