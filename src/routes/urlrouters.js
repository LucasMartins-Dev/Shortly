import { Router } from "express";
import { validateToken } from "../middlewares/schemavalidate.js";
import { shorten, getUrlById, getShortUrl, deleteUrlById } from "../controllers/urlcontrollers.js";
import { validateDelete , validateSchemaUrls } from "../middlewares/urlvalidate.js";

const route = Router();

route.get("/urls/:id", getUrlById);
route.get("/urls/open/:shortUrl", getShortUrl);
route.use(validateToken);
route.post("/urls/shorten", validateSchemaUrls, shorten);
route.delete("/urls/:id", validateDelete,deleteUrlById);

export default route;