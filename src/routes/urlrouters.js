import { Router } from "express";
import { validateSchema, validateToken } from "../middlewares/schemavalidate.js";
import { shorten, getUrlById, getShortUrl, deleteUrlById } from "../controllers/urlcontrollers.js";
import { urlSchema } from "../schemas/urlSchema.js";

const route = Router();

route.get("/urls/:id", getUrlById);
route.get("/urls/open/:shortUrl", getShortUrl);
route.post("/urls/shorten",validateToken, validateSchema(urlSchema), shorten);
route.delete("/urls/:id", validateToken,deleteUrlById);

export default route;