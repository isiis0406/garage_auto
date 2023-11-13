import {Router}  from "express";
import {
    loginUser, 
    logoutUser, 
    loginStatus,
    changePassword,
    forgotPassword,
    resetPassword,
} from '../../controllers/auth/authController.js';
import { protect } from "../../middleware/authMiddleware.js";

const router = Router();


router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/loggedin', loginStatus);
router.patch('/changepassword', protect,changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

export { router as  authRouter };