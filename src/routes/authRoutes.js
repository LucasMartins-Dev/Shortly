import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";

const route = Router()

route.post('/signup', validateSchema(signUpSchema), signUp)
route.post('/signin', validateSchema(signInSchema), signIn)

export default route