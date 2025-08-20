"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponse = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(4).max(100),
    name: zod_1.default.string().min(4).max(100),
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(4).max(100),
});
exports.userResponse = zod_1.default.object({
    id: zod_1.default.string(),
    email: zod_1.default.email(),
    name: zod_1.default.string().min(2).max(100),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
});
//# sourceMappingURL=userSchema.js.map