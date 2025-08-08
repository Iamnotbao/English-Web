import { Router } from 'express';
import { createLesson, deleteLesson, editLesson, getAllLesson, getSingleLesson } from '../controller/lesson.controller';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();


//lesson
router.get('/',getAllLesson);
router.get('/:id',authMiddleware,getSingleLesson);
router.post('/user/:user_id',authMiddleware,createLesson);
router.put('/:user_id/:id',authMiddleware,editLesson);
router.delete('/:id/',authMiddleware,deleteLesson);


export default router;
