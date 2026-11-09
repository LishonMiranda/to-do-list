import { apiRequest } from "./api";

export const getTasks = () =>
    apiRequest("/tasks");

export const createTask = (task) =>
    apiRequest("/tasks", {
        method: "POST",
        body: JSON.stringify(task)
    });

export const deleteTask = (id) =>
    apiRequest(`/tasks/${id}`, {
        method: "DELETE"
    });