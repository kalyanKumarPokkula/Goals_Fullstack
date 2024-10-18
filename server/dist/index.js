"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.listen(config_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, db_1.connect)();
    console.log(`⚡️[server]: Server is running at http://localhost:${config_1.PORT}`);
}));
