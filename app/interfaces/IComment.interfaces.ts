import {Document, Types} from "mongoose"

export interface IComment extends Document{
    post_id: Types.ObjectId;
    author_id:Types.ObjectId;
    content:string;
}