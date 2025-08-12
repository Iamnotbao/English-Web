"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLesson = exports.editLesson = exports.createLesson = exports.getSingleLesson = exports.getAllLesson = void 0;
const lesson_service_1 = __importDefault(require("../services/lesson.service"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const getAllLesson = async (req, res) => {
    try {
        const allLessons = await lesson_service_1.default.GetAllLesson();
        if (allLessons) {
            res.status(200).json({
                message: "Get all lessons successfully",
                success: true,
                lessons: allLessons
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAllLesson = getAllLesson;
const getSingleLesson = async (req, res) => {
    const id = req.params.id;
    try {
        const lesson = await lesson_service_1.default.GetSingleLession(id);
        if (lesson) {
            return res.status(200).json({
                message: "Get lesson successfully!",
                lesson
            });
        }
        else {
            return res.status(404).json({
                message: "lesson is not found!"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSingleLesson = getSingleLesson;
const createLesson = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        let lessons = { ...req.body };
        if (typeof lessons.words === "string") {
            lessons.words = JSON.parse(lessons.words);
        }
        if (req.file) {
            const imageUrl = await (0, cloudinary_utils_1.uploadToCloudinary)(req.file.buffer);
            lessons.image_url = imageUrl;
        }
        const newLessonList = await lesson_service_1.default.CreateLesson(user_id, lessons);
        if (newLessonList) {
            return res.status(200).json({
                message: "successfully added the lesson",
                data: newLessonList
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.createLesson = createLesson;
const editLesson = async (req, res) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    const lesson = req.body;
    try {
        const editLesson = await lesson_service_1.default.EditLesson(id, user_id, lesson);
        if (editLesson) {
            return res.status(200).json({
                message: "Edit successfully!",
                editLesson
            });
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.editLesson = editLesson;
const deleteLesson = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            await lesson_service_1.default.DeleteLesson(id);
            return res.status(204).json({
                message: "delete successfully!"
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    return res.status(402).json({
        message: "lesson_id is null"
    });
};
exports.deleteLesson = deleteLesson;
