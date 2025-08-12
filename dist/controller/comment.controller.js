"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllComment = exports.GetCommentById = exports.CreateComment = void 0;
const comment_service_1 = require("../services/comment.service");
const mongoose_1 = require("mongoose");
const CreateComment = async (req, res) => {
    const user_id = req.params.user_id;
    const post_id = req.params.post_id;
    try {
        const data = {
            post_id: new mongoose_1.Types.ObjectId(post_id),
            author_id: new mongoose_1.Types.ObjectId(user_id),
            content: req.body.content
        };
        const comment = await comment_service_1.CommentService.AddComment(data);
        res.status(201).json({
            message: "Create comment successfully!",
            comment
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.CreateComment = CreateComment;
const GetCommentById = async (req, res) => {
    const post_id = req.params.post_id;
    const comments = await comment_service_1.CommentService.GetComment(post_id);
    res.status(201).json({
        message: "Get comment by post successfully!",
        comments
    });
};
exports.GetCommentById = GetCommentById;
const GetAllComment = async (req, res) => {
    const comments = await comment_service_1.CommentService.GetAllComment();
    res.status(201).json({
        message: "Get all comments successfully!",
        comments
    });
};
exports.GetAllComment = GetAllComment;
