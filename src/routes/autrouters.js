import { Router } from "express";
import { signUp, signIn } from "../controllers/autcontrollers.js";
import {validateSchema } from "../middlewares/schemavalidate.js";
import { uSchema,lSchema } from "../schemas/uSchema.js";
import { validateToken } from "../middlewares/schemavalidate.js";
import { getUser , getRanking} from "../controllers/usercontrollers.js";

const route = Router();
route.post("/signup",validateSchema(uSchema), signUp);
route.post("/signin",validateSchema(lSchema), signIn);
route.get("/users/me", validateToken, getUser);
route.get("/ranking", getRanking);


export default route;