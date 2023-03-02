import { Router } from "express";
import { getUserLinks } from "../controllers/userscontrollers.js";
import { TokenValidation } from "../middlewares/tokenValidation.js";

const route = Router()

route.get('/users/me', TokenValidation, getUserLinks)

export default route