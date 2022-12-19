import { config } from 'dotenv';
import { Router } from "express";

import { productosGet } from "../controllers/prodsController.js"

import { productosDao } from "../daos/index.js"

if (process.env.NODE_ENV === 'dev'){
  config()
}

const products = Router()

products.get("/:cat", productosGet);

/* products.get("/:cat", async (req, res) => {
  
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

}); */

products.get("/prod/:id", async (req, res) => {  
  const { id } = req.params    
  const productos = await productosDao.listarUno(id);
  
  res.status(201).send(productos).json
  /* res.status(201).json(productos) */
});

products.post("/", async (req, res) => { 
  
  const {nombre, descripcion, codigo, foto, precio, stock, timestamp} = req.body
  const productos = await productosDao.guardarUno({nombre, descripcion, codigo, foto, precio, stock, timestamp})  
  res.status(201).json(productos)

});

products.delete("/:id", async (req, res) => { 

  const { id } = req.params  
  const data = await productosDao.borrarUno(id)
  res.json(data) 

});

products.put("/:id", async (req, res) => {

  const id = parseInt(req.params.id)
  const {nombre, descripcion, codigo, foto, precio, stock, timestamp} = req.body
  const data = await productosDao.editaUno(id, {nombre, descripcion, codigo, foto, precio, stock, timestamp})  
  res.json(data) 

});

export default products;