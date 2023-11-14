"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
var transport = nodemailer_1.default.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "961265e272cb3b",
        pass: "cae7f97e5e4b9a",
    },
});
// const transport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: EMAIL_ID,
//     pass: EMAIL_PASS,
//   },
// });
exports.default = transport;
