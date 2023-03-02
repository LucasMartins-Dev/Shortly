import { Router } from "express";
import { createShortUrl, deleteUrl, getUrlById, openUrl } from "../controllers/urlsController.js";
import { TokenValidation } from "../middlewares/tokenValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { shortUrlSchema } from "../schemas/urlsSchemas.js";

const route = Router()

route.post('/urls/shorten', TokenValidation, validateSchema(shortUrlSchema), createShortUrl)
route.get('/urls/:id', getUrlById)
route.get('/urls/open/:shortUrl', openUrl)
route.delete('/urls/:id', TokenValidation, deleteUrl)

export default route
