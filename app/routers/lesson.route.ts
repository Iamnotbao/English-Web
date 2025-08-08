import { Router } from 'express';
import { createLesson, getAllLesson } from '../controller/lesson.controller';

const router = Router();


//lesson
router.get('/',getAllLesson);
// router.get('/lesson/:id',getSingleLesson);
router.post('/:user_id',createLesson);
// router.put('/lesson/:id',editLesson);
// router.delete('/lesson/:id',deleteLesson);


export default router;
