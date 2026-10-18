import express from 'express'
import { viewTasks, createTasks, updateTask, deleteTask } from '../controllers/taskController.js'
const router = express.Router()

router.route('/viewTasks').get(viewTasks);
router.route('/writeTasks').post(createTasks);
router.route('/updateTask/:id').put(updateTask).patch(updateTask);
router.route('/deleteTask/:id').delete(deleteTask);

export default router