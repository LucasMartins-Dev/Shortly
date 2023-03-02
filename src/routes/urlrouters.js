import { Router } from "express";
import { validateToken } from "../middlewares/schemavalidate.js";
import { urlSchema } from "../schemas/urlSchemas.js";
import { shorten, getUrlById, getShortUrl, deleteUrlById } from "../controllers/urlcontrollers.js";
import { validateSchema } from "../middlewares/schemavalidate.js";

const route = Router();

route.get("/urls/:id", getUrlById);
route.get("/urls/open/:shortUrl", getShortUrl);
route.use(validateToken);
route.post("/urls/shorten", validateSchema(urlSchema), shorten);
route.delete("/urls/:id", deleteUrlById);

export default route;