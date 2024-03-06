"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./configs/config");
const db_1 = require("./configs/db");
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Goals!");
});
// app.use(express.static("public"));
// app.use("/*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });
app.listen(config_1.PORT, () => {
    (0, db_1.connect)();
    console.log(`⚡️[server]: Server is running at http://localhost:${config_1.PORT}`);
});
