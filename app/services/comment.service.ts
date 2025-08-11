import { IComment } from "../interfaces/IComment.interfaces";
import Comment from "../models/comment.model"
import Post from "../models/post.model"

export const CommentService = {
    AddComment: async (commentData: Partial<IComment>) => {
        const comment = await Comment.create(commentData);
        await Post.findByIdAndUpdate(commentData.post_id, {
            $push: { comments: comment._id }
        });
        return comment;
    },
    GetComment: async (post_id: string) => {
        const comment = await Comment.find({ post_id }).populate("author_id", "username avatar");
        return comment;
    },
    GetAllComment: async () => {
        const comment = await Comment.find({});
        return comment;
    }
}