import express from "express";
import { Router } from "express";

import { carritosDao } from "../daos/index.js"

const carts = Router();

carts.post("/:carro", async (req, res) => {
  const {carro} = req.params
  
  const producto=JSON.stringify(req.body)

  const data = await carritosDao.agregarProducto(carro, producto)
  res.status(201).json(data)

});

carts.get("/", async (req, res) =>{
  const datos = await carritosDao.listarTodos()
  res.status(201).json(datos)
})

carts.delete("/:id", async (req, res) => {    //elimina carrito
  const id = req.params.id
  const data = await carritosDao.borrarUno(id)  
  res.json(data) 
});

carts.get("/:id/productos", async (req, res) => {  
  const { id } = req.params;
  const usuario=req.session.user
  const usrID=process.env.USERID

  const data = await carritosDao.buscarCarro(id);

  if (data.length==0) {
    res.status(302).render("carritoVacio",{usuario, usrID});
  } else {
    const carro=data[0];
    res.status(201).render("carrito", {carro, usuario, usrID});
  }
});


carts.post("/:id/productos/", (req, res) => {
  
  const idCarrito = req.params.id
  const {id ,nombre, descripcion, codigo, foto, precio, stock, timestamp} = req.body
  carritosDao.agregarProducto(idCarrito, {id ,nombre, descripcion, codigo, foto, precio, stock, timestamp})
  .then(data => {
    res.status(201).json(data)
  })

});


carts.delete("/:id/productos/:idProducto", async (req, res) => { 
  const idCarrito = req.params.id   
  const idProducto = req.params.idProducto
  const data = await carritosDao.eliminarProducto(idCarrito, idProducto)
  /* res.status(201).render("carrito", {data, usuario, usrID}); */
  res.json(data)
});

export default carts;
