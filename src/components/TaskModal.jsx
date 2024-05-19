import SlideInNotifications from './SlideInNotifications';
import { Trash, X } from '@phosphor-icons/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../Global_state-redux/TaskActions';

const TaskModal = ({ task, setSelectedTask }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    setSelectedTask(null);
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur text-black flex items-center justify-center">
      <div className="bg-white relative p-4 rounded-md max-w-md w-full">
        <button
          className="absolute top-2 right-2 text-black"
          onClick={() => setSelectedTask(null)}
        >
          <X className='text-red-700' size={32} />
        </button>
        <h1 className="text-xl font-bold mb-2">{task.heading}</h1>
        <h2 className="text-gray-500 mb-4">{task.creationTime}</h2>
        <p>{task.text}</p>
        <div id="button_container" className="flex items-center gap-3 smartphone:flex-col smartphone:gap-1">
          <SlideInNotifications
            initialIsCompleted={task.completed}
            taskId={task.id}
            dispatch={dispatch}
          />
          <Trash onClick={() => handleDeleteTask(task.id)} size={32} weight="duotone" className="hover:scale-105 transition-all" />
        </div>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    creationTime: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  setSelectedTask: PropTypes.func.isRequired,
};

export default TaskModal;
