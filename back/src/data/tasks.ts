import ResponseError from "../types/error";
import { Task, TaskResp } from "../types/tasks";

class TasksStorage {
  private nextIndex: number
  private tasks: Map<number, Task>;

  constructor() {
    this.nextIndex = 2;
    this.tasks = new Map();
    this.tasks.set(0, {text: "Test1", done: false});
    this.tasks.set(1, {text: "Test2", done: false});
  }

  public getTasks(): TaskResp[] {
    return [...this.tasks.entries()].map(([id, {text, done}]) => ({id, text, done}));
  }

  public addTask(text: string): TaskResp {
    this.nextIndex += 1;
    const task: Task = {text, done: false};
    this.tasks.set(this.nextIndex - 1, task);
    return {id: this.nextIndex - 1, ...task};
  }

  public editTask(id: number, task: Partial<Task>): TaskResp {
    const oldTask = this.tasks.get(id);
    if (oldTask) {
      const newTask = {...oldTask, ...task}
      this.tasks.set(id, newTask);
      return {id, ...newTask};
    }
    throw new ResponseError(`Task with id ${id} was not found`, 404)
  }

  public toggleTask(id: number): TaskResp {
    const oldTask = this.tasks.get(id);
    if (oldTask) {
      const newTask: Task = {...oldTask, done: !oldTask.done}
      this.tasks.set(id, newTask);
      return {id, ...newTask};
    }
    throw new ResponseError(`Task with id ${id} was not found`, 404)
  }

  public deleteTask(id: number): void {
    this.tasks.delete(id);
  }
}

const tasksStorage = new TasksStorage();

export default tasksStorage;