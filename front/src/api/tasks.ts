import { baseURL } from ".";
import { TaskResp } from "../types/tasks";

class TasksAPI {
  private static baseTasksURL = `${baseURL}/tasks`;
  private static baseOptions: ResponseInit = {
    headers: {
      'content-type': 'application/json'
    }
  }

  public static getTasks(): Promise<TaskResp[]> {
    return fetch(this.baseTasksURL)
    .then((resp) => resp.json());
  }

  public static addTask(text: string) {
    const body = JSON.stringify({text});
    return fetch(this.baseTasksURL, { ...this.baseOptions, method: 'POST', body })
    .then((resp) => resp.json());
  }

  public static toggleTask(id: number): Promise<TaskResp[]> {
    return fetch(`${this.baseTasksURL}/${id}`, { ...this.baseOptions, method: 'PATCH' })
    .then((resp) => resp.json());
  }

  public static deleteTask(id: number): Promise<TaskResp[]> {
    return fetch(`${this.baseTasksURL}/${id}`, { ...this.baseOptions, method: 'DELETE' })
    .then((resp) => resp.json());
  }
}

export default TasksAPI;