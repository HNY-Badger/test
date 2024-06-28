import { TaskResp, TasksAction, TasksActionType, TasksAsyncAction, TasksAsyncActionType, TasksState } from "../../types/tasks";

const initialState: TasksState = {
  tasks: []
}

function deleteById(list: TaskResp[], id: number): TaskResp[] {
  return list.filter((task) => task.id !== id);
}

function refreshTaskList(current: TaskResp[], pending: TaskResp[]): TaskResp[] {
  let newList: TaskResp[] = [];
  let pendingList = [...pending];
  current.forEach((task) => {
    const pendingTask = pendingList.find((pendingTask) => pendingTask.id === task.id);
    if (pendingTask) {
      newList.push(pendingTask);
      pendingList = deleteById(pendingList, pendingTask.id);
    }
  });
  return [...newList, ...pendingList];
}

function moveTaskInList(list: TaskResp[], index: number, offset: number): TaskResp[] {
  const newList = [...list];
  if (index >= 0 && index < newList.length && index + offset >= 0 && index + offset < newList.length) {
    const temp = newList[index];
    newList[index] = newList[index + offset];
    newList[index + offset] = temp;
  }
  return newList;
}

function tasksReducer(state: TasksState = initialState, action: TasksAsyncAction | TasksAction) {
  let tasks: TaskResp[];
  switch(action.type) {
    case TasksAsyncActionType.GET_TASKS_SUCCEEDED:
    case TasksAsyncActionType.ADD_TASK_SUCCEEDED:
    case TasksAsyncActionType.TOGGLE_TASK_SUCCEEDED:
    case TasksAsyncActionType.DELETE_TASK_SUCCEEDED:
      tasks = refreshTaskList(state.tasks, action.tasks);
      return {tasks};
    case TasksActionType.MOVE_TASK:
      tasks = moveTaskInList(state.tasks, action.index, action.offset);
      return {tasks};
    default:
      return state;
  }
}

const requestTasks = () => ({type: TasksAsyncActionType.GET_TASKS_REQUESTED});
const addTask = (text: string) => ({type: TasksAsyncActionType.ADD_TASK_REQUESTED, text});
const toggleTask = (id: number) => ({type: TasksAsyncActionType.TOGGLE_TASK_REQUESTED, id});
const deleteTask = (id: number) => ({type: TasksAsyncActionType.DELETE_TASK_REQUESTED, id});
const moveTask = (index: number, offset: number) => ({type: TasksActionType.MOVE_TASK, index, offset});

export default tasksReducer;
export { requestTasks, addTask, toggleTask, deleteTask, moveTask };