import mongoose, { Schema, Types, Document } from "mongoose";
import { IWord } from "../interfaces/IWord.interface";

export interface ILesson extends Document {
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    director: Types.ObjectId;  
    rating: number;
    words: IWord[]; 
}

const WordSchema = new Schema<IWord>({
    word: { type: String, required: true },
    meaning: { type: String, required: true }, 
    example: { type: String },
    explain: { type: String }
});

const LessonSchema = new Schema<ILesson>({
    name: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    rating: { type: Number, default: 0 },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    words: [WordSchema],
}, { timestamps: true });

export default mongoose.model<ILesson>('Lesson', LessonSchema);
