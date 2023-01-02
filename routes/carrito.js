/* import express from "express"; */
import { Router } from "express";
import { carritoGetTodos, carritoPostAgregarProducto, carritoDelete, carritoGetSegunUsuario, carritoDeleteProducto } from "../controllers/cartController.js";

// import { carritosDao } from "../daos/index.js"

const carts = Router();


carts.post("/:carro", carritoPostAgregarProducto);

carts.get("/", carritoGetTodos)

carts.delete("/:id", carritoDelete);

carts.get("/:id/productos", carritoGetSegunUsuario);

carts.delete("/:id/productos/:idProducto", carritoDeleteProducto);

export default carts;
