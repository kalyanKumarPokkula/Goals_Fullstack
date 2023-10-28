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
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../configs/config");
const emailConfig_1 = __importDefault(require("../configs/emailConfig"));
const sendEmail = (email, emailType, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedToken = bcrypt_1.default.hashSync(userId.toString(), 10);
        console.log(email);
        console.log(userId);
        console.log(config_1.DOMAIN);
        console.log(typeof config_1.DOMAIN);
        if (emailType === "VERIFY") {
            let user = yield user_1.User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 36000000,
            });
            console.log(user);
        }
        else if (emailType === "RESET") {
            yield user_1.User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 36000000,
            });
        }
        const mailOptions = {
            from: "kalyanakhil022@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<P>Click <a href="${config_1.DOMAIN}/api/auth/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</P>`,
        };
        // const mailOptions = {
        //   from: "kalyanakhil022@gmail.com",
        //   to: email,
        //   subject:
        //     emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        //   html: `<P>Click <a href="${DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        //     emailType === "VERIFY" ? "Verify your email" : "Reset your password"
        //   }</P>`,
        // };
        const mailResponse = yield emailConfig_1.default.sendMail(mailOptions);
        console.log(mailResponse);
        return mailResponse;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = sendEmail;
