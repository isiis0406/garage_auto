import { Router } from "express";
import {


    getUsers,
    getUser,
    userRegister,
    updateUser,
    deleteUser,

} from '../../controllers/user/userController.js';
import { protect } from '../../middleware/authMiddleware.js';


const router = Router();


router.get('/:id',
    getUser);



router.get('/',
    getUsers);

router.post('/create',
    userRegister);

router.patch('/:id',
    updateUser);


router.delete('/:id',
    deleteUser);

export { router as userRouter };