"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const mongoose_1 = require("mongoose");
const post_model_1 = __importDefault(require("../models/post.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.PostService = {
    createPost: async (postData) => {
        return await post_model_1.default.create(postData);
    },
    getAllPost: async (page = 1, limit = 10) => {
        const post = await post_model_1.default.find().skip((page - 1) * limit).limit(limit).populate("author_id", "username avatar");
        return post;
    },
    getPostById: async (id) => {
        const post = await post_model_1.default.findById(id).populate("author_id", "username avatar");
        if (post) {
            return post;
        }
        else {
            throw new Error("Post is not exist!");
        }
    },
    toggleLike: async (id, user_id) => {
        const post = await post_model_1.default.findById(id);
        if (!post)
            return null;
        const isLiked = post.likes.includes(new mongoose_1.Types.ObjectId(user_id));
        if (isLiked) {
            post.likes = post.likes.filter(u_id => u_id.toString() !== user_id);
        }
        else {
            post.likes.push(new mongoose_1.Types.ObjectId(user_id));
        }
        await post.save();
        return post;
    },
    deletePost: async (id, user_id) => {
        const post = await post_model_1.default.findById(id);
        const user = await user_model_1.default.findById(user_id);
        if (!post)
            return null;
        if (user?.role !== "admin" && post.author_id.toString() !== user_id) {
            throw new Error("Unauthorized");
        }
        return await post_model_1.default.findByIdAndDelete(id);
    }
};
