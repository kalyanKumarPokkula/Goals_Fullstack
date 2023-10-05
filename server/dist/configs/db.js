"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    try {
        mongoose_1.default.connect("mongodb+srv://akhilkalyan:Kalyan123@cluster0.fqm7swm.mongodb.net/Goals-DB");
        console.log("Successfully connected to DB");
    }
    catch (error) {
        console.log("Not able to connect a DB");
        console.log(error);
    }
};
exports.connect = connect;
