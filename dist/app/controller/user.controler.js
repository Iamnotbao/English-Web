"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLessonByUser = exports.EditProfile = exports.GetProfileUser = exports.GetListByUser = void 0;
const user_service_1 = require("../services/user.service");
const GetListByUser = async (req, res) => {
    const user_id = req.params.user_id;
    const user_list = await user_service_1.UserService.GetListByUser(user_id);
    if (user_list) {
        return res.status(200).json({
            message: "Successfully get all list of user",
            user_list
        });
    }
};
exports.GetListByUser = GetListByUser;
const GetProfileUser = async (req, res) => {
    const user_id = req.params.user_id;
    const user = await user_service_1.UserService.GetProfileUSer(user_id);
    if (user) {
        return res.status(200).json({
            message: "Successfully get profile of user",
            user
        });
    }
};
exports.GetProfileUser = GetProfileUser;
const EditProfile = async (req, res) => {
    const user_id = req.params.user_id;
    const update_profile = req.body;
    console.log("update", update_profile);
    const result = await user_service_1.UserService.UpdateProfile(user_id, update_profile);
    if (result) {
        return res.status(204).json({
            message: "Successfully delete lesson",
        });
    }
    else {
        return res.status(401).json({
            message: "Update Failed!",
        });
    }
};
exports.EditProfile = EditProfile;
const DeleteLessonByUser = async (req, res) => {
    const user_id = req.params.user_id;
    const lesson_id = req.params.lesson_id;
    const result = await user_service_1.UserService.DeleteLessonByUser(user_id, lesson_id);
    if (result) {
        return res.status(204).json({
            message: "Successfully delete lesson",
        });
    }
};
exports.DeleteLessonByUser = DeleteLessonByUser;
