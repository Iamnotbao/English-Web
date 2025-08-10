import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { DeleteLessonByUser, GetListByUser, GetProfileUser } from '../controller/user.controler';

const router = Router();


//user
router.get('/list/:user_id',authMiddleware,GetListByUser);
router.get('/:user_id',authMiddleware,GetProfileUser);
// router.post('/user/:user_id',authMiddleware,createLesson);
// router.put('/:user_id/:id',authMiddleware,editLesson);
router.delete('/:user_id/:lesson_id/',authMiddleware,DeleteLessonByUser);


export default router;
