import { FormEventHandler, useEffect, useState } from 'react';
import './AdditionForm.scss';
import { useAppDispatch } from '../../store/hooks';
import { addTask, requestTasks } from '../../store/reducers/tasksReducer';

function AdditionForm() {
  const dispatch = useAppDispatch();
  const [taskText, setTaskText] = useState<string>('');

  useEffect(() => {
    dispatch(requestTasks());
  }, [])

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(addTask(taskText));
    setTaskText('');
  }

  return (
    <form onSubmit={submitHandler} className='addition-form'>
      <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} className='addition-input' />
      <button className='addition-button'>Add</button>
    </form>
  );
}

export default AdditionForm;
