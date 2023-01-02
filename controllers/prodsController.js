import { productosDao } from "../daos/index.js";
import { dtoProducts } from "../dto/productsDto.js";


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
    
    const prods = await productosDao.listarTodos(cat);
    const usuario=req.session.user
    
    const usrID=process.env.USERID
    
    const productos=dtoProducts(prods);

    res.status(200).render('productos', {productos, categorias, usuario, usrID, cat});
  
};

export async function unProductoGet (req, res) {  
  
  const { id } = req.params;

  const productos = await productosDao.listarUno(id);

  if (productos.length == 0) {
    res.status(404).json({error: 'producto no encontrado'});
  } else {
    const prods=dtoProducts(productos);
    res.status(201).send(prods).json;
  };
};

export async function productosPost (req, res) { 

  const {title, description, price, discountPercentage, rating, brand, category, stock,thumbnail, timestamp} = req.body
  const productos = await productosDao.guardarUno({title, description, price, discountPercentage, rating, stock, brand, category, thumbnail})  
  res.status(201).json(productos)

};

export async function productosPut (req, res) {

  const { id } = req.params;
  const {title, description, price, discountPercentage, rating, brand, category, stock,thumbnail, timestamp} = req.body;
  const data = await productosDao.editaUno(id, {title, description, price, discountPercentage, rating, brand, category, stock,thumbnail, timestamp});
  res.json(data) 

};

export async function productosDelete  (req, res) { 

  const { id } = req.params;
  const data = await productosDao.borrarUno(id);
  res.status(200).json(data);
  
};