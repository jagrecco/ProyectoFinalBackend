import { Router } from "express";
import subirImg from "../middleware/multer.js";
import { profileGet, profilePost } from "../controllers/userController.js";

const profile = Router();

profile.get('/', profileGet);

profile.post('/', subirImg.single('foto'), profilePost);

export default profile;