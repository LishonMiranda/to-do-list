import express from 'express'
import { viewTasks, createTasks, updateTask, deleteTask } from '../controllers/taskController.js'
import { isAuthenticatedUser } from '../middleware/auth.js'

const router = express.Router()



router.route('/viewTasks').get(isAuthenticatedUser, viewTasks);
router.route('/writeTasks').post(isAuthenticatedUser, createTasks);
router.route('/updateTask/:id').put(isAuthenticatedUser, updateTask).patch(isAuthenticatedUser, updateTask);
router.route('/deleteTask/:id').delete(isAuthenticatedUser, deleteTask);

export default router