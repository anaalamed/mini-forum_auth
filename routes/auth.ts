import { Router } from 'express';
import { login, logout, register, updatePersonalInfo, getMe, changePassword } from '../controllers/auth'
import { verifyUser } from '../middlewares/verify-user'

const authRouter = Router();


authRouter.post('/api/register', register);
authRouter.post('/api/login', login);
authRouter.get('/api/me', verifyUser, getMe);
authRouter.post('/api/me', verifyUser, updatePersonalInfo);
authRouter.post('/api/change-password', verifyUser, changePassword);
authRouter.post('/api/logout', verifyUser, logout); // doesn't work

export default authRouter;
