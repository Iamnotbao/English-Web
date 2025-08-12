"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const post_controller_1 = require("../controller/post.controller");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, post_controller_1.CreatePost);
router.get("/", authMiddleware_1.default, post_controller_1.GetAllPosts);
router.get("/:id", authMiddleware_1.default, post_controller_1.GetPostById);
router.post("/:id/like/:user_id", authMiddleware_1.default, post_controller_1.ToogleLike);
router.delete("/:id/:user_id", authMiddleware_1.default, post_controller_1.DeletePost);
exports.default = router;
