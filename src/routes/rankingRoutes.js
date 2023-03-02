import { Router } from "express";
import { getRanking } from "../controllers/rankingController.js";

const route = Router()

route.get('/ranking', getRanking)

export default route