import express, { Request, Response } from "express";
import tasksStorage from "../services/tasks";
import ResponseError from "../types/error";
import { TaskResp } from "../types/tasks";
import TasksController from "../controllers/tasks";

const tasksRouter = express.Router();

tasksRouter.get('/', TasksController.getTasks);

tasksRouter.post('/', TasksController.addTask);

tasksRouter.put('/:id', TasksController.editTask);

tasksRouter.patch('/:id', TasksController.toggleTask)

tasksRouter.delete('/:id', TasksController.deleteTask)

export default tasksRouter;