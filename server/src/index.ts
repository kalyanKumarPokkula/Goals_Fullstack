const express = require("express");
import { Express, Request, Response } from "express";
import { PORT } from "./configs/config";
import { connect } from "./configs/db";
import API from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", API);

app.listen(PORT, () => {
  connect();
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
