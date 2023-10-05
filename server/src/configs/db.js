"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var mongoose_1 = require("mongoose");
var connect = function () {
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
