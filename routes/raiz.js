import { Router } from "express";
import { raizUsr } from "../controllers/userController.js";

const raiz = Router()

raiz.get("/", raizUsr);

export default raiz;