import mongoose from "mongoose";


export enum EnglishLevel {
  A1 = "A1 - Beginner",
  A2 = "A2 - Elementary",
  B1 = "B1 - Intermediate",
  B2 = "B2 - Upper Intermediate",
  C1 = "C1 - Advanced",
  C2 = "C2 - Proficient",
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    avatar: string;
    role: 'student' | 'teacher' | 'admin';
    lessons:mongoose.Types.ObjectId[];
    level: EnglishLevel;
    overall: number;
    bio: string;
    certifications:string[];
    badges:string[];
    gallery:string[];
    skills?: { name: string; progress: number }[];
}
 