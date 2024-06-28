import {CallEffect, PutEffect, call, put, takeEvery} from 'redux-saga/effects';
import TasksAPI from '../../api/tasks';
import { TaskResp, TasksAsyncActionType, TasksAddSagaAction, TasksIdSagaAction } from '../../types/tasks';

function* getTasksWorker(): Generator<CallEffect<TaskResp[]> | PutEffect, void, TaskResp[]> {
  const tasks = yield call(() => TasksAPI.getTasks());
  yield put({type: TasksAsyncActionType.GET_TASKS_SUCCEEDED, tasks});
}

function* addTaskWorker(action: TasksAddSagaAction): Generator<CallEffect<TaskResp[]> | PutEffect, void, TaskResp[]> {
  const tasks = yield call(() => TasksAPI.addTask(action.text));
  yield put({type: TasksAsyncActionType.ADD_TASK_SUCCEEDED, tasks});
}

function* toggleTaskWorker(action: TasksIdSagaAction): Generator<CallEffect<TaskResp[]> | PutEffect, void, TaskResp[]> {
  const tasks = yield call(() => TasksAPI.toggleTask(action.id));
  yield put({type: TasksAsyncActionType.TOGGLE_TASK_SUCCEEDED, tasks});
}

function* deleteTaskWorker(action: TasksIdSagaAction): Generator<CallEffect<TaskResp[]> | PutEffect, void, TaskResp[]> {
  const tasks = yield call(() => TasksAPI.deleteTask(action.id));
  yield put({type: TasksAsyncActionType.DELETE_TASK_SUCCEEDED, tasks});
}

function* tasksWatcher() {
  yield takeEvery(TasksAsyncActionType.GET_TASKS_REQUESTED, getTasksWorker);
  yield takeEvery(TasksAsyncActionType.ADD_TASK_REQUESTED, addTaskWorker);
  yield takeEvery(TasksAsyncActionType.TOGGLE_TASK_REQUESTED, toggleTaskWorker);
  yield takeEvery(TasksAsyncActionType.DELETE_TASK_REQUESTED, deleteTaskWorker);
}

export default tasksWatcher;