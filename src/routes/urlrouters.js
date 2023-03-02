import { Router } from "express";
import { validateSchema, validateToken } from "../middlewares/schemavalidate.js";
import { shorten, getUrlById, getShortUrl, deleteUrlById } from "../controllers/urlcontrollers.js";
import { validateDelete , validateSchemaUrls } from "../middlewares/urlvalidate.js";
import { urlSchema } from "../schemas/urlSchema.js";

const route = Router();

route.get("/urls/:id", getUrlById);
route.get("/urls/open/:shortUrl", getShortUrl);
route.use(validateToken);
route.post("/urls/shorten", validateSchema(urlSchema), shorten);
route.delete("/urls/:id", validateDelete,deleteUrlById);

export default route;