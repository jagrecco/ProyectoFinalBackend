import { Router } from "express";

import { logoutUser } from "../controllers/userController.js";

const logout = Router();

logout.get("/", logoutUser);

export default logout;