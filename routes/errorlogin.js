import { Router } from "express";
const errorlogin = Router();

errorlogin.get('/', (req, res)=>{

    res.status(404).render('errorlogin')
})

export default errorlogin;