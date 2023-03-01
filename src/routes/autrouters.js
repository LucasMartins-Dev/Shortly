import { Router } from "express";
import { signUp, signIn } from "../controllers/autcontrollers.js";
import {validateUSchema , validateLSchema} from "../middlewares/schemavalidate.js";


const route = Router();
route.post("/signup", validateUSchema, signUp);
route.post("/signin",validateLSchema, signIn);

export default route;