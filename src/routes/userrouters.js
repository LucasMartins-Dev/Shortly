
import { Router } from "express";
import { validateToken } from "../middlewares/schemavalidate.js";
import { getUser } from "../controllers/usercontrollers.js";
const route = Router();

route.get("/users/me", validateToken, getUser);

export default route;