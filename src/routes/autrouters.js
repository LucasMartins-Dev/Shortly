import { Router } from "express";
import { signUp, signIn } from "../controllers/autcontrollers.js";
import {validateSchema } from "../middlewares/schemavalidate.js";
import { uSchema,lSchema } from "../schemas/uSchema.js";


const route = Router();
route.post("/signup",validateSchema(uSchema), signUp);
route.post("/signin",validateSchema(lSchema), signIn);

export default route;