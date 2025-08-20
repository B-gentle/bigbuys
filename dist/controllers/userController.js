"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userSchema_1 = require("../schemas/userSchema");
exports.signup = (0, asyncHandler_1.default)(async (req, res) => {
    const payload = userSchema_1.signUpSchema.parse(req.body);
    const { name, email, password } = payload;
    if (!email || !name || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const userExists = await userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }
    const user = await userModel_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        // generateToken(res, user._id);
        res.status(201).json({
            _id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        });
    }
    else {
        res.status(500);
        throw new Error("Failed to create user.");
    }
});
//# sourceMappingURL=userController.js.map