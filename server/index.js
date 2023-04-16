import express from "express";
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from "morgan";
import bodyParser from "body-parser";
import predictRouter from './routes/predict.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet()); // secures HTTP header returned by the express app
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // so that browser blocks no cors
app.use(morgan("common")); //it is used to log the requests with info in terminal
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(predictRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}.`)
})