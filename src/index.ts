import express from "express";
import bodyParser from "body-parser";
import CONSTANTS from "./constants";
import mongoose from "mongoose";
import router from "./routes/url.route";

//DB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(CONSTANTS.DB_URI, {}).then(() => console.log("Connection to DB established"));

// APP INITIALIZATION
export const app = express();

//Middlewares
app.use(bodyParser.json());
app.use("/", router);

export const server = app.listen(CONSTANTS.PORT, () => {
  console.log("Server started on port ", CONSTANTS.PORT);
});
