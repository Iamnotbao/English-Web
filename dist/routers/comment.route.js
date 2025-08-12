"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const comment_controller_1 = require("../controller/comment.controller");
const router = (0, express_1.Router)();
router.post("/:post_id/:user_id", authMiddleware_1.default, comment_controller_1.CreateComment);
router.get("/:post_id", authMiddleware_1.default, comment_controller_1.GetCommentById);
router.get("/", authMiddleware_1.default, comment_controller_1.GetAllComment);
exports.default = router;
