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
exports.UserService = void 0;
const userRepository_1 = require("../repositorys/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = __importDefault(require("../utils/mailer"));
class UserService {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hashPass = this.hashPassword(data.password);
                data.password = hashPass;
                let user = yield this.userRepository.signUp(data);
                if (user) {
                    // let token = this.generateJwt({ userId: user._id, email: user.email });
                    let response = {
                        username: user.name,
                        // token: token,
                        status: 201,
                        // isVerfied: user.isVerfied!,
                    };
                    yield (0, mailer_1.default)(user.email, "VERIFY", user._id);
                    return response;
                }
                return user;
            }
            catch (error) {
                console.log("Something went wrong in the User Service");
                throw error;
            }
        });
    }
    signIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepository.findByEmail(data.email);
                if (!(user === null || user === void 0 ? void 0 : user.isVerified)) {
                    let response = {
                        isVerified: user === null || user === void 0 ? void 0 : user.isVerified,
                    };
                    return response;
                }
                if (user) {
                    if (this.comparePassword(data.password, user.password)) {
                        let token = this.generateJwt({ userId: user._id, email: user.email });
                        let response = {
                            username: user.name,
                            token: token,
                            status: 200,
                        };
                        return response;
                    }
                    else {
                        console.log("Incorrect Password");
                        return { status: 401 };
                    }
                }
                else {
                    return { status: 553 };
                }
            }
            catch (error) {
                console.log("Somethign went wrong in the User Service");
                throw error;
            }
        });
    }
    comparePassword(pass, hashPass) {
        try {
            return bcrypt_1.default.compareSync(pass, hashPass);
        }
        catch (error) {
            console.log("incorrect password");
            throw error;
        }
    }
    generateJwt(userPayload) {
        try {
            let payload = { id: userPayload.userId, email: userPayload.email };
            let token = jsonwebtoken_1.default.sign(payload, "avi", {
                expiresIn: "1h",
            });
            return token;
        }
        catch (error) {
            console.log("Something went wrong in token generate ");
            throw error;
        }
    }
    hashPassword(password) {
        try {
            return bcrypt_1.default.hashSync(password, 10);
        }
        catch (error) {
            console.log("Something went wrong while hashing the password");
            throw error;
        }
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepository.findByEmail(email);
                return user;
            }
            catch (error) {
                console.log("Something went wrong while hashing the password");
                throw error;
            }
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepository.findById(userId);
                if (user) {
                    return { username: user.name };
                }
            }
            catch (error) {
                console.log("Something went wrong while hashing the password");
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
