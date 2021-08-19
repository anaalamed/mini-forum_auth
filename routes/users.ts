import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users'
import { verifyUser } from '../middlewares/verify-user'

const usersRouter = Router();

const verifyAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ error: "admin not authorized" });
    }
}

usersRouter.get('/api/users', getUsers); // for admin only

// usersRouter.get('/api/users', verifyUser, verifyAdmin, getUsers); // for admin only
usersRouter.post('/api/users', verifyUser, verifyAdmin, createUser);
usersRouter.put('/api/users/:userId', verifyUser, verifyAdmin, updateUser);
usersRouter.delete('/api/users/:userId', verifyUser, verifyAdmin, deleteUser);

export default usersRouter;
