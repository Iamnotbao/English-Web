"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const authService = {
    SignIn: async (userData) => {
        const user = await user_model_1.default.findOne({ email: userData.email });
        if (!user)
            throw new Error('User not found');
        const isMatch = await user.comparePassword(userData.password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        return user;
    },
    SignUp: async (userData) => {
        const user = new user_model_1.default(userData);
        await user.save();
        return user;
    }
};
exports.default = authService;
