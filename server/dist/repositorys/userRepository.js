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
exports.UserRepository = void 0;
const user_1 = require("../models/user");
class UserRepository {
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_1.User.create(data);
                return user;
            }
            catch (error) {
                console.log("Something went wrong in the User Repo");
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_1.User.findOne({ email: email });
                return user;
            }
            catch (error) {
                console.log("Something went wrong in the User Repo");
                throw error;
            }
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_1.User.findById(userId);
                return user;
            }
            catch (error) {
                console.log("Something went wrong in the User Repo");
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
