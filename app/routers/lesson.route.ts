import { Router } from 'express';
import { createLesson, deleteLesson, editLesson, getAllLesson, getSingleLesson } from '../controller/lesson.controller';

const router = Router();


//lesson
router.get('/',getAllLesson);
router.get('/:id',getSingleLesson);
router.post('/user/:user_id',createLesson);
router.put('/:user_id/:id',editLesson);
router.delete('/:id/',deleteLesson);


export default router;
