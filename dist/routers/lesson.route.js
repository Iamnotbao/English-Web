"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_controller_1 = require("../controller/lesson.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = (0, express_1.Router)();
//lesson
router.get('/', lesson_controller_1.getAllLesson);
router.get('/:id', authMiddleware_1.default, lesson_controller_1.getSingleLesson);
router.post('/user/:user_id', authMiddleware_1.default, upload_1.default.single('image_url'), lesson_controller_1.createLesson);
router.put('/:user_id/:id', authMiddleware_1.default, lesson_controller_1.editLesson);
router.delete('/:id/', authMiddleware_1.default, lesson_controller_1.deleteLesson);
exports.default = router;
