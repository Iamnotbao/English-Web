import { Request, Response } from "express";
import { PostService } from "../services/post.service";



export const CreatePost = async (req: Request, res: Response) => {
    const user_id = req.params;
    try {
        const data = {
            author_id: user_id,
            ...req.body
        };
        const post = await PostService.createPost(data);
        return res.status(201).json({
            message: "Create posts successfully!",
            post
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const GetAllPosts = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const posts = await PostService.getAllPost(page);
    if (posts) {
        return res.status(201).json({
            message: "Get all posts successfully!",
            posts
        });
    }
}

export const GetPostById = async (req: Request, res: Response) => {
    const post = await PostService.getPostById(req.params.id);
    if (post) {
        return res.status(201).json({
            message: "Get detail of post is successfully!",
            post
        });
    } else {
        return res.status(404).json({
            message: "the post is not existed!",
        })
    }
}
export const ToogleLike = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    const post = await PostService.toggleLike(id, user_id);
    if (post) {
        return res.status(201).json({
            message: "Toogle Like!",
            post
        });
    } else {
        return res.status(404).json({
            message: "The post is not existed!",
        })
    }
}

export const DeletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    await PostService.deletePost(id, user_id);
    return res.status(204).json({
        message: "Delete post is successfully!"
    });

}

