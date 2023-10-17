"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./dist/configs/config");
const db_1 = require("./dist/configs/db");
const routes_1 = __importDefault(require("./dist/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = express();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.default);
app.use(express.static(path_1.default.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.listen(config_1.PORT, () => {
  (0, db_1.connect)();
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config_1.PORT}`
  );
  console.log(__dirname);
});
