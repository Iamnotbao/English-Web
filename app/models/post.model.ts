import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/IPost.interfaces";

const postSchema = new Schema<IPost>({
    author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    content: { type: String, required: true },
    lesson_id: { type: Schema.Types.ObjectId, ref: "Lesson" },
    image_url: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comment_count: { type: Number, default: 0 },
    share_count: { type: Number, default: 0 },
    tags: [{
        type: String,
        enum: ["Grammar", "Speaking", "Vocabulary", "Listening"]
    }]
}, { timestamps: true });

export default mongoose.model<IPost>("Post", postSchema);