import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import autroute from "./routes/autrouters.js"
import urlroute from "./routes/urlrouters.js"
import userroute from "./routes/usersrouters.js"
import rankingroute from "./routes/rankingrouters.js"

dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())
server.use([autroute, urlroute, userroute, rankingroute])

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`O server está rodando na porta: ${port}`))