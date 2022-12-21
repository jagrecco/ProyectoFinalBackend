import { Router } from "express";

import { productosGet, unProductoGet, productosPost, productosDelete, productosPut } from "../controllers/prodsController.js"

const products = Router()

products.get("/:cat", productosGet);

products.get("/prod/:id", unProductoGet);

products.post("/", productosPost);

products.delete("/:id", productosDelete);

products.put("/:id", productosPut);

export default products;