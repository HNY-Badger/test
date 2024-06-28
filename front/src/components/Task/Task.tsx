import { useAppDispatch } from '../../store/hooks';
import { deleteTask, moveTask, toggleTask } from '../../store/reducers/tasksReducer';
import { TaskResp } from '../../types/tasks';
import './Task.scss';

type Props = TaskResp & {index: number}

function Task({id, text, done, index}: Props) {
  const dispatch = useAppDispatch();

  const checkHandler = () => {
    dispatch(toggleTask(id));
  }

  const deleteHandler = () => {
    dispatch(deleteTask(id));
  }

  const moveHandler = (offset: number) => {
    dispatch(moveTask(index, offset));
  }

  return (
    <div className='task'>
      <div className='check-container'>
        <input className='checkbox' type="checkbox" name='done' id={`done-${id}`} checked={done} onChange={checkHandler} />
        <label className='task-text' htmlFor={`done-${id}`}>{`${id} ${text}`}</label>
      </div>
      <div className='buttons'>
        <button className='delete-button' onClick={deleteHandler}>╳</button>
        <div className='order-buttons'>
          <button className='order-button' onClick={() => moveHandler(-1)}>▲</button>
          <button className='order-button' onClick={() => moveHandler(1)}>▼</button>
        </div>
      </div>
    </div>
  )
}

export default Task;