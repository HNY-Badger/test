import { Action } from "redux-saga";

export type TaskResp = {
  id: number
  text: string,
  done: boolean
}

export enum TasksAsyncActionType {
  GET_TASKS_REQUESTED = 'GET_TASKS_REQUESTED',
  GET_TASKS_SUCCEEDED = 'GET_TASKS_SUCCEEDED',
  GET_TASKS_FAILED = 'GET_TASKS_FAILED',

  ADD_TASK_REQUESTED = 'ADD_TASK_REQUESTED',
  ADD_TASK_SUCCEEDED = 'ADD_TASK_SUCCEEDED',
  ADD_TASK_FAILED = 'ADD_TASK_FAILED',

  TOGGLE_TASK_REQUESTED = 'TOGGLE_TASK_REQUESTED',
  TOGGLE_TASK_SUCCEEDED = 'TOGGLE_TASK_SUCCEEDED',
  TOGGLE_TASK_FAILED = 'TOGGLE_TASK_FAILED',

  DELETE_TASK_REQUESTED = 'DELETE_TASK_REQUESTED',
  DELETE_TASK_SUCCEEDED = 'DELETE_TASK_SUCCEEDED',
  DELETE_TASK_FAILED = 'DELETE_TASK_FAILED',
}

export enum TasksActionType {
  MOVE_TASK = 'MOVE_TASK'
}

export type TasksAsyncAction = {
  type: TasksAsyncActionType
  tasks: TaskResp[]
}

export type TasksAction = {
  type: TasksActionType
  index: number
  offset: number
}

export type TasksState = {
  tasks: TaskResp[],
}

export interface TasksAddSagaAction extends Action { text: string }

export interface TasksIdSagaAction extends Action { id: number }
