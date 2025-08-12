"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header is missing",
        });
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, 'access_token', function (err, user) {
        if (err) {
            return res.status(404).json({
                message: "The user is not authenticated",
            });
        }
        req.user = user;
        req.user = user;
        next();
    });
};
exports.default = authMiddleware;
