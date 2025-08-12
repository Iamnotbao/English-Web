import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { DeleteLessonByUser, EditProfile, GetListByUser, GetProfileUser } from '../controller/user.controler';
import upload from '../middleware/upload';

const router = Router();


//user
router.get('/list/:user_id',authMiddleware,GetListByUser);
router.get('/:user_id',authMiddleware,GetProfileUser);
// router.post('/user/:user_id',authMiddleware,createLesson);
router.put('/:user_id',authMiddleware,upload.single('avatar'),EditProfile);
router.delete('/:user_id/:lesson_id/',authMiddleware,DeleteLessonByUser);


export default router;
