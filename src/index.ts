import express from "express";
import bodyParser from "body-parser";
import CONSTANTS from "./constants";
import mongoose from "mongoose";
import urlRouter from "./routes/url.route";
import viewRouter from "./routes/view.route";
import ejs from "ejs";
import path from "path";
import cors from "cors";

//DB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(CONSTANTS.DB_URI, {}).then(() => console.log("Connection to DB established"));

// APP INITIALIZATION
export const app = express();

//SRR init
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", ejs);
app.set("views", path.join(__dirname, "../views"));

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/", viewRouter);
app.use("/api", urlRouter);

export const server = app.listen(CONSTANTS.PORT, () => {
  console.log("Server started on port ", CONSTANTS.PORT);
});
