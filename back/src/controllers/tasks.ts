import { Request, Response } from "express";
import tasksStorage from "../services/tasks";
import { TaskResp } from "../types/tasks";
import ResponseError from "../types/error";

class TasksController {
  public static getTasks(req: Request, res: Response) {
    res.json(tasksStorage.getTasks());
  }

  public static addTask(req: Request, res: Response) {
    try {
      const body: Pick<TaskResp, 'text'> = req.body;
      tasksStorage.addTask(body.text);
      res.json(tasksStorage.getTasks());
    } catch {
      res.sendStatus(500);
    }
  }

  public static editTask(req: Request, res: Response) {
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
  }

  public static toggleTask(req: Request, res: Response) {
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
  }

  public static deleteTask(req: Request, res: Response) {
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
  }
}


export default TasksController;