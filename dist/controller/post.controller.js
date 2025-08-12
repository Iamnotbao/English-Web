"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePost = exports.ToogleLike = exports.GetPostById = exports.GetAllPosts = exports.CreatePost = void 0;
const post_service_1 = require("../services/post.service");
const CreatePost = async (req, res) => {
    const user_id = req.params;
    try {
        const data = {
            author_id: user_id,
            ...req.body
        };
        const post = await post_service_1.PostService.createPost(data);
        return res.status(201).json({
            message: "Create posts successfully!",
            post
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.CreatePost = CreatePost;
const GetAllPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const posts = await post_service_1.PostService.getAllPost(page);
    if (posts) {
        return res.status(201).json({
            message: "Get all posts successfully!",
            posts
        });
    }
};
exports.GetAllPosts = GetAllPosts;
const GetPostById = async (req, res) => {
    const post = await post_service_1.PostService.getPostById(req.params.id);
    if (post) {
        return res.status(201).json({
            message: "Get detail of post is successfully!",
            post
        });
    }
    else {
        return res.status(404).json({
            message: "the post is not existed!",
        });
    }
};
exports.GetPostById = GetPostById;
const ToogleLike = async (req, res) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    const post = await post_service_1.PostService.toggleLike(id, user_id);
    if (post) {
        return res.status(201).json({
            message: "Toogle Like!",
            post
        });
    }
    else {
        return res.status(404).json({
            message: "The post is not existed!",
        });
    }
};
exports.ToogleLike = ToogleLike;
const DeletePost = async (req, res) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    await post_service_1.PostService.deletePost(id, user_id);
    return res.status(204).json({
        message: "Delete post is successfully!"
    });
};
exports.DeletePost = DeletePost;
