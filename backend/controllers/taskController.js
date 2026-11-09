import errorHandler from "../middleware/errors.js"
import mongoose from "mongoose"
import Task from "../models/tasks.js"
import ErrorHandler from "../utils/errorHandler.js"
import parseJWT from "../utils/parsejwt.js"



const viewTasks = async (req, res, next) => {
    // Assuming you have the user ID available in req.user
    const tasks = await Task.find({ user: parseJWT(req, next) })
    res.status(200).json({
        success: true, tasks: tasks.map(task => ({
            id: task._id,
            title: task.title,
            completed: task.completed,
            dueDate: task.dueDate
        }))

    })
}


const createTasks = async (req, res, next) => {
    const { title, completed, dueDate, priority, tags, description } = req.body


    if (!title || title.trim() === '') {
        return next(new ErrorHandler('Title is required', 400))
    }
    const task = new Task({
        title,
        completed: completed,
        dueDate: dueDate,
        priority: priority,
        tags: tags,
        description: description,
        user: parseJWT(req, next) // Assuming you have the user ID available in req.user
    })

    await task.save()

    res.status(201).json(task)

}

const updateTask = async (req, res, next) => {
    const id = req.params.id

    if (!id || id.trim() === '') {
        return next(new ErrorHandler('ID is required', 400))
    }

    const task = await Task.findById(id)

    if (!task) {
        return next(new ErrorHandler('Task not found', 404))
    }

    const { completed } = req.body

    task.completed = completed
    await task.save()

    res.status(200).json(task)

}

const deleteTask = async (req, res, next) => {
    const id = req.params.id
    if (!id || id.trim() === '') {
        return next(new ErrorHandler('ID is required', 400))
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler('Invalid ID format', 400))
    }
    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
        return next(new ErrorHandler('Task not found', 404))
    }
    res.status(200).json({ message: 'Task deleted successfully' })
}
export { viewTasks, createTasks, updateTask, deleteTask }

// Continue with pagination, filtering, and sorting features as needed.