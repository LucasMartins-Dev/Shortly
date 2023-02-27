import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import autrouters from "../routes/autrouters.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(autrouters);





app.listen(process.env.PORT, () => console.log(`Server running`));