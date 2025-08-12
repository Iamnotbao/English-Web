"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authService = {
    generateAccessToken: (data) => {
        const access_token = jsonwebtoken_1.default.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        return access_token;
    },
    generateRefreshToken: (data) => {
        const refresh_token = jsonwebtoken_1.default.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        return refresh_token;
    },
    refreshTokenService: async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).json({
                    message: "Authorization header is missing",
                });
            }
            const refresh_token = authHeader.split(" ")[1];
            if (!refresh_token) {
                return res.status(401).json({
                    message: "Refresh token is not provided",
                });
            }
            const payload = await new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err)
                        return reject(new Error("Invalid refresh token"));
                    resolve(decoded);
                });
            });
            const newAccessToken = authService.generateAccessToken({
                id: payload._id,
                username: payload.username
            });
            return newAccessToken;
        }
        catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    },
    SignIn: async (userData) => {
        const user = await user_model_1.default.findOne({
            $or: [
                {
                    username: userData.username
                },
                {
                    email: userData.email
                }
            ]
        });
        if (!user)
            throw new Error('User not found');
        const isMatch = await user.comparePassword(userData.password);
        if (!isMatch)
            throw new Error('Password is not correct');
        const access_token = authService.generateAccessToken({ id: user._id, username: user.username });
        const refresh_token = authService.generateRefreshToken({ id: user._id, username: user.username });
        // console.log("access_token:", access_token);
        // console.log("refresh_token:", refresh_token);
        return { user, access_token, refresh_token };
    },
    SignUp: async (userData) => {
        const existingUser = await user_model_1.default.findOne({
            $or: [
                { username: userData.username },
                { email: userData.email }
            ]
        });
        if (existingUser)
            throw new Error('User already exists');
        const user = new user_model_1.default(userData);
        console.log("Creating user with data:", userData);
        await user.save();
        return user;
    },
    SignOut: async () => {
        return { message: 'User signed out successfully' };
    }
};
exports.default = authService;
