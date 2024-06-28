export type Task = {
  text: string,
  done: boolean,
}

export type TaskResp = Task & {id: number}