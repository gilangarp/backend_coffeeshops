import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./src/routers";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

const logger = morgan("dev")
app.use(logger)

const configs: CorsOptions = {
  origin: 'file:///C:/Users/LENOVO/Downloads/index.html',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: []
}
app.use(cors(configs))

app.use(express.static("./public"));

app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Is Running On PORT http://localhost:${PORT}`)
});