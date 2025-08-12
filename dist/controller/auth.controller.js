"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFreshToken = exports.SignOut = exports.SignUp = exports.SignIn = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const SignIn = async (req, res) => {
    try {
        const user = await auth_service_1.default.SignIn(req.body);
        res.status(200).json({
            message: 'User logged in successfully',
            _id: user.user._id,
            username: user.user.username,
            email: user.user.email,
            access_token: user.access_token,
            refresh_token: user.refresh_token
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
const SignOut = async (req, res) => {
    try {
        await auth_service_1.default.SignOut();
        res.status(201).json({
            message: 'User signed out successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.SignOut = SignOut;
const userFreshToken = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing",
            });
        }
        const refresh_token = authHeader.split(" ")[1];
        if (refresh_token) {
            const new_Access_Token = await auth_service_1.default.refreshTokenService(req, res);
            return res.status(200).json({
                message: "Token refreshed successfully",
                access_token: new_Access_Token
            });
        }
        else {
            return res.status(401).json({
                message: "the refresh token is not valid",
            });
        }
    }
    catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ message: "Failed to refresh token" });
    }
};
exports.userFreshToken = userFreshToken;
