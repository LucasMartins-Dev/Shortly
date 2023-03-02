import { Router } from "express";
import { signIn, signUp } from "../controllers/autcontrollers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/autSchemas.js";

const route = Router()

route.post('/signup', validateSchema(signUpSchema), signUp)
route.post('/signin', validateSchema(signInSchema), signIn)

export default route