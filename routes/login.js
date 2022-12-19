import { Router } from "express";
import passport from "passport";

import {loginUsr, ingresoApp} from "../controllers/userController.js";

const login = Router()

login.get("/", loginUsr);

login.post("/", passport.authenticate('local', { failureRedirect: "/errorlogin"}), ingresoApp);

export default login;