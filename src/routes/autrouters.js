import { Router } from "express";
import { signUp, signIn } from "../controllers/autcontrollers.js";
import {validateUSchema , validateLSchema} from "../middlewares/schemavalidate.js";


const route = Router();
route.post("/sign-up", validateUSchema, signUp);
route.post("/sign-in",validateLSchema, signIn);

export default route;