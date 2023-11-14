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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgottenPassword = exports.verifyEmail = exports.user = exports.signUp = exports.signIn = void 0;
const userService_1 = require("../services/userService");
const zod_1 = require("zod");
const common_1 = require("../common/common");
const user_1 = require("../models/user");
const userService = new userService_1.UserService();
const signUpInput = zod_1.z.object({
    name: zod_1.z.string().min(1).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3),
});
const signInInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3),
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload = signUpInput.safeParse(req.body);
        if (!payload.success) {
            return res
                .status(411)
                .json((0, common_1.commanResponse)({ err: payload.error.issues, success: false }));
        }
        let name = payload.data.name.charAt(0).toUpperCase() + payload.data.name.slice(1);
        let email = payload.data.email;
        let password = payload.data.password;
        let user = yield userService.findByEmail(email);
        if (user) {
            return res
                .status(200)
                .json((0, common_1.commanResponse)({ success: false, message: "User already exists" }));
        }
        else {
            let response = yield userService.signUp({ name, email, password });
            return res.status(201).json((0, common_1.commanResponse)({
                data: response,
                success: true,
                message: "Successfully created a User",
            }));
        }
    }
    catch (error) {
        return res.status(500).json((0, common_1.commanResponse)({
            success: false,
            message: "Something went wrong in creating a user",
        }));
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload = signInInput.safeParse(req.body);
        if (!payload.success) {
            return res
                .status(411)
                .json((0, common_1.commanResponse)({ success: false, err: payload.error.issues }));
        }
        let email = payload.data.email;
        let password = payload.data.password;
        let response = yield userService.signIn({ email, password });
        if (response.status === 553) {
            return res.status(200).json((0, common_1.commanResponse)({
                success: false,
                message: "Invalid Email",
            }));
        }
        else if (response.status === 401) {
            return res.status(200).json((0, common_1.commanResponse)({
                success: false,
                message: "Incorrect Password",
            }));
        }
        else if (response.isVerified === false) {
            return res.status(200).json((0, common_1.commanResponse)({
                success: false,
                message: "Not verified",
            }));
        }
        else {
            return res.status(200).json((0, common_1.commanResponse)({
                success: true,
                message: "Successfully Logged In",
                data: response,
            }));
        }
    }
    catch (error) {
        return res.status(500).json((0, common_1.commanResponse)({
            success: false,
            message: "Something went wrong in Login a user",
        }));
    }
});
exports.signIn = signIn;
const forgottenPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        let response = yield userService.forgottenPassword(email);
        if (response) {
            return res.status(200).json((0, common_1.commanResponse)({
                success: true,
                message: "Reset token sent to the email",
            }));
        }
        else {
            return res.json({
                success: false,
                message: "User not found",
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.forgottenPassword = forgottenPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { token, newPassword } = req.body;
        let user = yield user_1.User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                message: "Invaild token",
                success: false,
            });
        }
        user.forgotPasswordToken = "";
        user.forgotPasswordTokenExpiry = undefined;
        user.password = userService.hashPassword(newPassword);
        yield user.save();
        return res.status(200).json({
            message: "Reset password successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ err: error.message });
    }
});
exports.resetPassword = resetPassword;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { token } = req.query;
        console.log(req.query);
        console.log(token);
        let user = yield user_1.User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                message: "Invaild token",
                success: false,
            });
        }
        user.isVerified = true;
        user.verifyToken = "";
        user.verifyTokenExpiry = undefined;
        yield user.save();
        return res.status(200).json({
            message: "Email verified successfully",
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({ err: error.message });
    }
});
exports.verifyEmail = verifyEmail;
const user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.headers.userId === "string") {
            let response = yield userService.findById(req.headers.userId);
            return res.status(200).json((0, common_1.commanResponse)({
                message: "Successfully fetched a User",
                success: true,
                data: response,
            }));
        }
    }
    catch (error) {
        return res
            .status(500)
            .json((0, common_1.commanResponse)({ success: false, message: "User doesn't exists" }));
    }
});
exports.user = user;
