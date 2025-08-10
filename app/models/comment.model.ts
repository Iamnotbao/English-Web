import mongoose, { Schema } from "mongoose"
import { IComment } from "../interfaces/IComment.interfaces"

const commentSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model<IComment>("Comment", commentSchema);