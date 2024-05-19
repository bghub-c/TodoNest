import SlideInNotifications from "./SlideInNotifications";
import { Trash, X } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskColor, deleteTask } from "../Global_state-redux/TaskActions";
import { motion } from "framer-motion";

const TaskModal = ({ task, setSelectedTask }) => {
  
  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    // Dispatch action to change task color
    dispatch(changeTaskColor(task.id, color));
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
     className="fixed inset-0 bg-black/60 backdrop-blur text-black flex items-center justify-center">
      <div className={`${!isDarkmode ?"bg-white/95 text-bg1":"bg-bg1/95 text-w1"} relative p-4 rounded-md max-w-md w-full`}>
        <button
          className="absolute top-2 right-2"
          onClick={() => setSelectedTask(null)}
        >
          <X className="text-red-700" size={32} />
        </button>
        <h1 className="text-xl font-bold mb-2">{task.heading}</h1>
        <h2 className=" mb-4">{task.creationTime}</h2>
        <p>{task.text}</p>
        <div
          id="button_container"
          className="flex items-center gap-2 smartphone:flex-row "
        >
          <button
            type="button"
            onClick={() => handleColorChange(`default`)}
            className={`px-3 py-1 rounded-md  bg-w1 ring-black text-gray-800 hover:ring-2 focus:ring-2 focus:scale-105 transition-all shadow-lg focus:shadow-white/20`}
          >
            Default
          </button>
          <button
            type="button"
            onClick={() => handleColorChange("AzureBreeze")}
            className="w-5 h-5 rounded-full bg-c1lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all  ring-c1lt shadow-lg focus:shadow-c1"
          ></button>
          <button
            type="button"
            onClick={() => handleColorChange("MeadowMist")}
            className="w-5 h-5 rounded-full bg-c2lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c2lt shadow-lg focus:shadow-c2/50"
          ></button>
          <button
            type="button"
            onClick={() => handleColorChange("PeachyBlush")}
            className="w-5 h-5 rounded-full bg-c3lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c3lt shadow-lg focus:shadow-c3/50"
          ></button>
          <button
            type="button"
            onClick={() => handleColorChange("LavenderHaze")}
            className="w-5 h-5 rounded-full bg-c4lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c4 shadow-lg focus:shadow-c4/50"
          ></button>
          <button
            type="button"
            onClick={() => handleColorChange("CoralCrush")}
            className="w-5 h-5 rounded-full bg-c5lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c5 shadow-lg focus:shadow-c5/50"
          ></button>
          <button
            type="button"
            onClick={() => handleColorChange("MintWhisper")}
            className="w-5 h-5 rounded-full bg-c6lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c6lt shadow-lg focus:shadow-c6/50"
          ></button>

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
