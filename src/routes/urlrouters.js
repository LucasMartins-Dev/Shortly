import { Router } from "express";
import { ShortUrl, deleteUrl, getUrlById, openUrl } from "../controllers/urlcontrollers.js";
import { TokenValidation } from "../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { shortUrlSchema } from "../schemas/urlSchemas.js";

const route = Router()

route.post('/urls/shorten', TokenValidation, validateSchema(shortUrlSchema), ShortUrl)
route.get('/urls/:id', getUrlById)
route.get('/urls/open/:shortUrl', openUrl)
route.delete('/urls/:id', TokenValidation, deleteUrl)

export default route
