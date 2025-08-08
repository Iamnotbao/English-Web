import mongoose from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'admin';
    lessons:mongoose.Types.ObjectId[];
}
 