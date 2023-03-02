import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import autroute from "./routes/autrouters.js"
import urlroute from "./routes/urlrouters.js"
import userroute from "./routes/usersrouters.js"
import rankingroute from "./routes/rankingrouters.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use([autroute, urlroute, userroute, rankingroute])

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`SERVER IS RUNNING IN PORT: ${port}`))