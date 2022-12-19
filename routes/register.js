import { Router } from "express";
import { registerGet, registerPost } from "../controllers/userController.js";

const register = Router();

import subirImg from "../middleware/multer.js";

register.get('/', registerGet);

register.post('/', subirImg.single('foto'), registerPost);

export default register;