"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
exports.UserService = {
    GetListByUser: async (user_id) => {
        const user = await user_model_1.default.findById(user_id);
        if (!user) {
            throw new Error("User is not exist!");
        }
        return user.lessons;
    },
    GetProfileUSer: async (user_id) => {
        const user = await user_model_1.default.findById(user_id);
        if (!user) {
            throw new Error("User is not exist!");
        }
        return user;
    },
    UpdateProfile: async (user_id, update_profile) => {
        const user = await user_model_1.default.findById(user_id);
        if (!user) {
            throw new Error("User is not exist!");
        }
        try {
            const updatedUser = await user_model_1.default.findByIdAndUpdate(user_id, { $set: update_profile }, { new: true, runValidators: true });
            return updatedUser;
        }
        catch (error) {
            throw new Error("Cannot update user!");
        }
    },
    DeleteLessonByUser: async (user_id, lesson_id) => {
        const user = await user_model_1.default.findById(user_id);
        if (!user)
            throw new Error("User does not exist!");
        // console.log(lesson_id);
        const oldCount = user.lessons.length;
        user.lessons = user.lessons.filter((l) => l._id.toString() !== lesson_id);
        if (user.lessons.length === oldCount) {
            throw new Error("Lesson not found for this user!");
        }
        await user.save();
        return user;
    }
};
