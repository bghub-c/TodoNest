import { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import TaskModal from "./TaskModal";

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const state = useSelector((state) => state.tasks);
  const tasks = state.tasks;
  const currentFilter = state.filter;
  const viewState = state.viewState;
  const isDarkmode = useSelector((state) => state.tasks.darkMode);

  const calculateColor = (color) => {
    if (!isDarkmode) {
      switch (color) {
        case "AzureBreeze":
          return "bg-c1";
        case "MeadowMist":
          return "bg-c2";
        case "PeachyBlush":
          return "bg-c3";
        case "LavenderHaze":
          return "bg-c4";
        case "CoralCrush":
          return "bg-c5";
        case "MintWhisper":
          return "bg-c6";
        default:
          return "border border-black/20";
      }
    } else {
      switch (color) {
        case "AzureBreeze":
          return "bg-c1lt";
        case "MeadowMist":
          return "bg-c2lt";
        case "PeachyBlush":
          return "bg-c3lt";
        case "LavenderHaze":
          return "bg-c4lt";
        case "CoralCrush":
          return "bg-c5lt";
        case "MintWhisper":
          return "bg-c6lt";
        default:
          return "border border-w1/30";
      }
    }
  };
  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (currentFilter === "ALL") return true;
        if (currentFilter === "COMPLETED") return task.completed;
        if (currentFilter === "INCOMPLETE") return !task.completed;
        return true;
      })
    : [];

  const containerClasses =
    viewState === "LIST" ? "flex flex-col" : "grid grid-cols-2";

  return (
    <div className="flex justify-center">
      <motion.ul layout className={`w-11/12 gap-2 ${containerClasses}`}>
        <AnimatePresence>
          {filteredTasks
            .map((task, index) => (
              <motion.li
                layout
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`relative rounded-md ${calculateColor(
                  task.bgCol
                )} transition-colors ease-out overflow-hidden max-h-24 text-nowrap smartphone:min-h-20`}
                onClick={() => setSelectedTask(task)}
              >
                <span>
                  {task.id}
                  <h1>{task.heading}</h1>
                  <h2>{task.creationTime}</h2>
                </span>
                <p className="text-wrap overflow-wrap break-word">
                  {task.text}
                </p>
              </motion.li>
            ))
            .reverse()}
        </AnimatePresence>
      </motion.ul>
      <AnimatePresence>
      {selectedTask && (
          <TaskModal task={selectedTask} setSelectedTask={setSelectedTask} />
      )}</AnimatePresence>
    </div>
  );
};

export default Tasks;
