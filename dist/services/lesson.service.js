"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_model_1 = __importDefault(require("../models/lesson.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const LessonService = {
    GetAllLesson: async () => {
        try {
            const allLessons = await lesson_model_1.default.find({});
            if (allLessons) {
                return allLessons;
            }
        }
        catch (error) {
            console.log(error);
        }
    },
    CreateLesson: async (user_id, lessonData) => {
        try {
            const user = await user_model_1.default.findById(user_id);
            if (!user) {
                throw new Error("User not found");
            }
            const lesson = new lesson_model_1.default({
                ...lessonData,
                director: user,
                director_name: user.username
            });
            await lesson.save();
            user.lessons.push(lesson._id);
            await user.save();
            return lesson;
        }
        catch (error) {
            console.error(error);
        }
    },
    GetSingleLession: async (id) => {
        try {
            const lesson = await lesson_model_1.default.findById(id);
            if (!lesson) {
                throw new Error('Lesson does not exist!');
            }
            return lesson;
        }
        catch (error) {
            console.error(error);
        }
    },
    DeleteLesson: async (id) => {
        try {
            const lesson = await lesson_model_1.default.findById(id);
            if (!lesson) {
                return lesson;
            }
            await user_model_1.default.updateMany({
                lessons: lesson._id
            }, {
                $pull: { lessons: lesson._id }
            });
            // console.log("choose:", lesson);
            await lesson_model_1.default.findByIdAndDelete(id);
            return lesson;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    EditLesson: async (id, user_id, lesson) => {
        try {
            const lessonById = await lesson_model_1.default.findById(id);
            if (!lessonById) {
                return { message: "Lesson not found" };
            }
            console.log("check director", lessonById.director);
            if (user_id === lessonById.director.toString()) {
                const edit = await lesson_model_1.default.findByIdAndUpdate(id, lesson, { new: true });
                console.log("after edit :", edit);
                return edit;
            }
            else {
                return {
                    message: "You are not the director, so you can not edit the lesson!"
                };
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.default = LessonService;
