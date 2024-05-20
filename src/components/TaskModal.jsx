import SlideInNotifications from "./SlideInNotifications";
import { Palette, Trash, X } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskColor, deleteTask } from "../Global_state-redux/TaskActions";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ColorButtons from "./ColorButtons";

const TaskModal = ({ task, setSelectedTask }) => {
  const [palettExpanded, setpalettExpanded] = useState(false);

  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    // Dispatch action to change task color
    dispatch(changeTaskColor(task.id, color));
    setpalettExpanded(!palettExpanded);
  };
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    setSelectedTask(null);
  };

  if (!task) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 bg-black/60 backdrop-blur text-black flex items-center justify-center"
    >
      <div
        className={`${
          !isDarkmode ? "bg-white/95 text-bg1" : "bg-bg1/95 text-w1"
        } relative p-4 rounded-md max-w-md w-full`}
      >
        <button
          className="absolute top-2 right-2"
          onClick={() => setSelectedTask(null)}
        >
          <X className="text-red-700" size={32} />
        </button>
        <h1 className="text-xl font-bold mb-2">{task.heading}</h1>
        <h2 className=" mb-4">{task.creationTime}</h2>
        <p>{task.text}</p>

        <div className="overflow-hidden flex flex-row">
          <AnimatePresence> 
            {
              !palettExpanded && <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Palette
                onClick={() => setpalettExpanded(!palettExpanded)}
                size={32}
              />
            </motion.span>
            }
          </AnimatePresence>
          <AnimatePresence>
            {palettExpanded && <ColorButtons func={handleColorChange} />}
          </AnimatePresence>
        </div>

        <SlideInNotifications
          initialIsCompleted={task.completed}
          taskId={task.id}
          dispatch={dispatch}
        />
        <Trash
          onClick={() => handleDeleteTask(task.id)}
          size={32}
          weight="duotone"
          className="hover:scale-105 transition-all"
        />
      </div>
    </motion.div>
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
