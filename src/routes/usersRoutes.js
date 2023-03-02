import { Router } from "express";
import { getUserLinks } from "../controllers/usersController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const route = Router()

route.get('/users/me', tokenValidation, getUserLinks)

export default route