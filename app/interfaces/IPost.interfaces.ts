import {Document, Types} from "mongoose"

export type PostType = "lesson" | "question";

export interface IPost extends Document{
    author_id: Types.ObjectId;
    title?: string;
    type:PostType;
    content: string;
    image_url: string[];
    likes:Types.ObjectId[];
    lesson_id: Types.ObjectId;
    comments : Types.ObjectId;
    share_count: number;
    votes:number;
    tags: string;
}