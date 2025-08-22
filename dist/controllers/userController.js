"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const userRepository_1 = require("../repository/userRepository");
const userSchema_1 = require("../schemas/userSchema");
const requestResponse_1 = require("../utils/requestResponse");
exports.signup = (0, asyncHandler_1.default)(async (req, res) => {
    const payload = userSchema_1.signUpSchema.parse(req.body);
    const { name, email, password } = payload;
    if (!email || !name || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const userExists = await userRepository_1.userRepo.findByEmail(email);
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }
    const user = await userRepository_1.userRepo.create(payload);
    if (user) {
        const token = (0, requestResponse_1.generateToken)(res, user._id.toString());
        res.status(201).json({
            _id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            token,
        });
    }
    else {
        res.status(500);
        throw new Error("Failed to create user.");
    }
});
exports.signin = (0, asyncHandler_1.default)(async (req, res) => {
    const payload = userSchema_1.signInSchema.parse(req.body);
    const { email, password } = payload;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const user = await userRepository_1.userRepo.findByEmail(email);
    if (user && (await user.matchPassword(password))) {
        const token = (0, requestResponse_1.generateToken)(res, user._id.toString());
        res.status(200).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            token,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid login details");
    }
});
//# sourceMappingURL=userController.js.map