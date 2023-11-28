"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goal = void 0;
const mongoose_1 = require("mongoose");
const goalSchema = new mongoose_1.Schema({
    goal: {
        type: String,
        required: true,
        min: 5,
    },
    priority: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });
exports.Goal = (0, mongoose_1.model)("Goal", goalSchema);
