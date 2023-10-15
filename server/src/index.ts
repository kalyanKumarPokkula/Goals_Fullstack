const express = require("express");
import { Express, Request, Response } from "express";
import { PORT } from "./configs/config";
import { connect } from "./configs/db";
import API from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", API);

app.use(express.static("public"));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  connect();
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  console.log(__dirname);
});
