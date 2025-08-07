"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = exports.SignIn = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const SignIn = async (req, res) => {
    try {
        const user = await auth_service_1.default.SignIn(req.body);
        res.status(200).json({
            message: 'User logged in successfully',
            username: user.username,
            email: user.email,
            // token: user.token
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.SignIn = SignIn;
const SignUp = async (req, res) => {
    try {
        await auth_service_1.default.SignUp(req.body);
        res.status(201).json({
            message: 'User signed up successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.SignUp = SignUp;
