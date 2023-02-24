import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

import routes from "./routes/index.js";
import socketServices from "./socket.js";
import dbConnect from "./db.js";

dbConnect();

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3200;

//Fix Bug: __dirname is not defined in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

socketServices(io);

server.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});
