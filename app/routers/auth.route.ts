import { Router } from 'express';
import { SignIn, SignUp } from '../controller/auth.controller';

const router = Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);

export default router;
