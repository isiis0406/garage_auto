import {Router}  from "express";
import {
    loginUser, 
    logoutUser, 
    loginStatus,
    changePassword,
    forgotPassword,
    resetPassword,
    getAuthUser
} from '../../controllers/auth/authController.js';
import { protect } from "../../middleware/authMiddleware.js";

const router = Router();


router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/loggedin', loginStatus);
router.get('/getAuthUser', protect, getAuthUser);
router.patch('/changepassword', protect,changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

export { router as  authRouter };