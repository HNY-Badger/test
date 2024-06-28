import express, { Request, Response } from "express";
import tasksStorage from "../data/tasks";
import ResponseError from "../types/error";
import { TaskResp } from "../types/tasks";

const tasksRouter = express.Router();

tasksRouter.get('/', (req: Request, res: Response) => {
  res.json(tasksStorage.getTasks());
})

tasksRouter.post('/', (req: Request, res: Response) => {
  try {
    const body: Pick<TaskResp, 'text'> = req.body;
    tasksStorage.addTask(body.text);
    res.json(tasksStorage.getTasks());
  } catch {
    res.sendStatus(500);
  }
})

tasksRouter.put('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    try {
      tasksStorage.editTask(id, req.body);
      res.json(tasksStorage.getTasks());
    } catch (e) {
      if (e instanceof ResponseError) {
        res.status(e.code);
        res.send(e.message);
      } else {
        res.sendStatus(500);
      }
    }
  } catch {
    res.sendStatus(400);
  }
})

tasksRouter.patch('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    try {
      tasksStorage.toggleTask(id);
      res.json(tasksStorage.getTasks());
    } catch (e) {
      if (e instanceof ResponseError) {
        res.status(e.code);
        res.send(e.message);
      } else {
        res.sendStatus(500);
      }
    }
  } catch {
    res.sendStatus(400);
  }
})

tasksRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    try {
      tasksStorage.deleteTask(id);
      res.json(tasksStorage.getTasks());
    } catch {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(400);
  }
})

export default tasksRouter;