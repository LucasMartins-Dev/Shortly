import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import autrouters from "./routes/autrouters.js";
import userrouters from "./routes/userrouters.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(autrouters);
app.use(userrouters);

const PORT = 5000;



app.listen(PORT, () => console.log(`Server running`));