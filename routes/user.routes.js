import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import { getUsers, getUser } from '../controllers/user.controller.js';

const userRouter = Router();



userRouter.get('/', getUsers);  
userRouter.get('/:id',authorize, getUser);
//userRouter.post('/', createUser);

userRouter.put('/:id', (req, res) => {
    res.send({ title: 'update user by id '});
}
);


userRouter.delete('/:id', (req, res) => {
    res.send({ title: 'delete a user'});
}
);



export default userRouter;