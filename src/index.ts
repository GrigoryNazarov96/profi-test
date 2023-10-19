import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/router";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

//DB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI as string, {}).then(() => console.log("Connection to DB established"));

// APP INITIALIZATION
export const app = express();

//SRR init
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", ejs);
app.set("views", path.join(__dirname, "../views"));

//Middlewares
app.use(bodyParser.json());
app.use("/", router);

export const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port ", process.env.PORT);
});
