import { Router } from "express";
const router = Router();

import log from '../utils/log.js'
import products from "./productos.js";
import cart from "./carrito.js";
import login from "./login.js";
import logout from "./logout.js";
import profile from "./profile.js";
import errorlogin from "./errorlogin.js"
import register from "./register.js";
import raiz from "./raiz.js"
import autenticado from "../middleware/autenticado.js";


router.use((req,res, next)=>{
    log(req.method, req.originalUrl, 200)
    next()
})

router.use("/", raiz);
router.use("/login", login);
router.use("/register", register)
router.use("/errorlogin", errorlogin);


//verifico si está autenticado
router.use("*", autenticado)

router.use("/logout", logout);
router.use("/api/productos", products);
router.use("/api/carrito", cart);
router.use("/profile", profile);

router.use('*', (req,res,next)=>{
    log(req.method,req.originalUrl, 404)
    res.status(404).render('error');
    next()
})


export default router