"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBURL = exports.PORT = void 0;
var dotenv = require("dotenv");
dotenv.config();
var PORT = process.env.PORT;
exports.PORT = PORT;
var DBURL = process.env.DBURL;
exports.DBURL = DBURL;
