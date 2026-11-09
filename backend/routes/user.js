import express from 'express'
import {
    registerUser, loginUser,
    logoutUser, updatePassword,
    updateUserProfile, deleteUserProfile, getUserProfile
} from '../controllers/authController.js'

import { isAuthenticatedUser } from '../middleware/auth.js'
const router = express.Router()




router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/updatePassword').put(isAuthenticatedUser, updatePassword);
router.route('/updateProfile').put(isAuthenticatedUser, updateUserProfile);
router.route('/deleteProfile').delete(isAuthenticatedUser, deleteUserProfile);
router.route('/myProfile').get(isAuthenticatedUser, getUserProfile);



export default router