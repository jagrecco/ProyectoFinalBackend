import { Router } from "express";

import { ordersGet, ordersPost, ordersDelete } from "../controllers/orderController.js"

const orders = Router()

orders.get("/:idUsr", ordersGet);

orders.post("/:idUsr", ordersPost);

orders.delete("/:idUsr", ordersDelete);

export default orders;