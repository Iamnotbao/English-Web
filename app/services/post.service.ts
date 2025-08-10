import { Types } from "mongoose";
import Post from "../models/post.model";
import User from "../models/user.model";
import { IPost } from "../interfaces/IPost.interfaces";
export const PostService = {

    createPost: async (postData: Partial<IPost>) => {
        return await Post.create(postData);
    },
    getAllPost: async (page: number = 1, limit: number = 10) => {
        const post = await Post.find().skip((page - 1) * limit).limit(limit).populate("author_id", "name");
        return post;
    },
    getPostById: async (id: string) => {
        const post = await Post.findById(id).populate("author_id", "name");
        if (post) {
            return post;
        }
        else {
            throw new Error("Post is not exist!");
        }
    },
    toggleLike: async (id: string, user_id: string) => {
        const post = await Post.findById(id);
        if (!post) return null;
        const isLiked = post.likes.includes(new Types.ObjectId(user_id));
        if (isLiked) {
            post.likes = post.likes.filter(u_id => u_id.toString() !== user_id);
        }
        else {
            post.likes.push(new Types.ObjectId(user_id));
        }
        await post.save();
        return post;
    },
    deletePost: async (id: string, user_id: string) => {
        const post = await Post.findById(id);
        const user = await User.findById(user_id);
        if (!post) return null;
        if (user?.role !== "admin" && post.author_id.toString() !== user_id) {
            throw new Error("Unauthorized");
        }
        return await Post.findByIdAndDelete(id);
    }

}
