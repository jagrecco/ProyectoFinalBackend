import { productosDao } from "../daos/index.js"

export async function productosGet (req, res) {
  
    const { cat } = req.params
    const categorias = [];
  
    const categ = await productosDao.listarCategorias();
    
    let elementoAnterior=""
  
    categ.forEach((element) => {
      if (elementoAnterior!=element.category) {
        categorias.push(element);
      }
      elementoAnterior=element.category
    });
    
    const productos = await productosDao.listarTodos(cat);
    const usuario=req.session.user
    
    const usrID=process.env.USERID
    
    res.status(200).render('productos', {productos, categorias, usuario, usrID, cat});
  
};