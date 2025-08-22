"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
exports.userRepo = {
    /**
     * Find a user by email
     */
    async findByEmail(email) {
        return userModel_1.default.findOne({ email }).exec();
    },
    /**
     * Create a new user document
     */
    async create(payload) {
        const created = await userModel_1.default.create(payload);
        return created;
    },
};
//# sourceMappingURL=userRepository.js.map