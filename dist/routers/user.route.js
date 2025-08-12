"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const user_controler_1 = require("../controller/user.controler");
const router = (0, express_1.Router)();
//user
router.get('/list/:user_id', authMiddleware_1.default, user_controler_1.GetListByUser);
router.get('/:user_id', authMiddleware_1.default, user_controler_1.GetProfileUser);
// router.post('/user/:user_id',authMiddleware,createLesson);
router.put('/:user_id', authMiddleware_1.default, user_controler_1.EditProfile);
router.delete('/:user_id/:lesson_id/', authMiddleware_1.default, user_controler_1.DeleteLessonByUser);
exports.default = router;
