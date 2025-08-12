"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const post_model_1 = __importDefault(require("../models/post.model"));
exports.CommentService = {
    AddComment: async (commentData) => {
        const comment = await comment_model_1.default.create(commentData);
        await post_model_1.default.findByIdAndUpdate(commentData.post_id, {
            $push: { comments: comment._id }
        });
        return comment;
    },
    GetComment: async (post_id) => {
        const comment = await comment_model_1.default.find({ post_id }).populate("author_id", "username avatar");
        return comment;
    },
    GetAllComment: async () => {
        const comment = await comment_model_1.default.find({});
        return comment;
    }
};
