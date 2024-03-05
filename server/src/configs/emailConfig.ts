import nodemailer from "nodemailer";
import { EMAIL_ID, EMAIL_PASS } from "./config";

// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "961265e272cb3b",
//     pass: "cae7f97e5e4b9a",
//   },
// });

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASS,
  },
});

export default transport;
