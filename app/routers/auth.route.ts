import { Router } from 'express';
import { SignIn, SignUp, SignOut,userFreshToken } from '../controller/auth.controller';

const router = Router();

//auth
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/signout', SignOut);
router.get('/refresh', userFreshToken);



export default router;
