
import './TaskList.scss';
import { useAppSelector } from '../../store/hooks';
import Task from '../Task/Task';

function TaskList() {
  const tasksState = useAppSelector((state) => state.tasksReducer);

  return (
    <div className='task-list'>
      {tasksState.tasks?.map(({id, text, done}, index) => <Task key={id} id={id} text={text} done={done} index={index} />)}
    </div>
  )
}

export default TaskList;