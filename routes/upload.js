import { Router } from "express";

import subirImg from "../middleware/multer.js";

const upload = Router()


upload.post("/", subirImg.single('imagen'),(req, res) => {

    console.log(req.file)
    
    /* res.status(200).render('index', {usuario}) */

});

export default upload;