import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { Types } from "mongoose";

export const CreateComment = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const post_id = req.params.post_id;
    try {
        const data = {
            post_id: new Types.ObjectId(post_id),
            author_id: new Types.ObjectId(user_id),
            content: req.body.content
        };
        const comment = await CommentService.AddComment(data);
        res.status(201).json({
            message: "Create comment successfully!",
            comment
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
export const GetCommentById = async (req: Request, res: Response) => {
    const post_id = req.params.post_id;
    const comments = await CommentService.GetComment(post_id);
    res.status(201).json({
        message: "Get comment by post successfully!",
        comments
    });
}
export const GetAllComment = async (req: Request, res: Response) => {
    const comments = await CommentService.GetAllComment();
    res.status(201).json({
        message: "Get all comments successfully!",
        comments
    });
}