import { IComment } from "../interfaces/IComment.interfaces";
import Comment from "../models/comment.model"
import Post from "../models/post.model"

export const CommentService = {
    AddComment: async (commentData: Partial<IComment>) => {
        const comment = await Comment.create(commentData);
        await Post.findByIdAndUpdate(commentData.post_id, {
            $inc: { comment_count: 1 }
        });
        return comment;
    },
    GetComment: async (post_id: string) => {
        const comment = await Comment.find({ post_id }).populate("author_id", "name");
        return comment;
    },
    GetAllComment: async () => {
        const comment = await Comment.find({});
        return comment;
    }
}