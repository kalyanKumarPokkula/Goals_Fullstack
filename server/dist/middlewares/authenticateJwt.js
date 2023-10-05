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
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let AuthHeader = req.headers.authorization;
        if (AuthHeader) {
            let token = AuthHeader.split(" ")[1];
            let Payload = jsonwebtoken_1.default.verify(token, "avi");
            if (!Payload) {
                return res.sendStatus(403);
            }
            if (typeof Payload === "string") {
                return res.sendStatus(403);
            }
            req.headers.userId = Payload.id;
            next();
            // let user = await User.findById(Payload.id);
            // if (user) {
            //   console.log(user);
            //   req.headers.userId = user._id;
            //   next();
        }
    }
    catch (error) {
        return res.status(403).json({
            message: "invalid token",
            success: false,
        });
    }
});
exports.authenticateJWT = authenticateJWT;
