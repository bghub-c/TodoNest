import { useSelector, useDispatch } from "react-redux";
import { deleteTask, isCompleteTask } from "../Global_state-redux/TaskActions";
import { AnimatePresence, motion } from "framer-motion";

const Tasks = () => {
  const state = useSelector((state) => state.tasks);
  const tasks = state.tasks;
  const currentFilter = state.filter;
  const viewState = state.viewState;
  const dispatch = useDispatch();
  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  console.log(tasks)
  const calculateColor = (color) => {
    if (!isDarkmode) {
      switch (color) {
        case 'AzureBreeze':
          return "bg-c1";
        case 'MeadowMist':
          return "bg-c2";
        case 'PeachyBlush':
          return "bg-c3";
        case 'LavenderHaze':
          return "bg-c4";
        case 'CoralCrush':
          return "bg-c5";
        case 'MintWhisper':
          return "bg-c6";
        default:
          return "border border-black/20"; // Return empty string for unknown colors
      }
    } else {
      switch (color) {
        case 'AzureBreeze':
          return "bg-c1lt"; // Lighter shade for red in light mode
        case 'MeadowMist':
          return "bg-c2lt"; // Lighter shade for blue in light mode
        case 'PeachyBlush':
          return "bg-c3lt"; // Lighter shade for green in light mode
        case 'LavenderHaze':
          return "bg-c4lt"; // Lighter shade for yellow in light mode
        case 'CoralCrush':
          return "bg-c5lt"; // Lighter shade for purple in light mode
        case 'MintWhisper':
          return "bg-c6lt"; // Lighter shade for orange in light mode
        default:
          return "border border-w1/30"; // Return empty string for unknown colors
      }
    }
  };
  

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleCompletenessTask = (taskId, isCompleted) => {
    dispatch(isCompleteTask({ id: taskId, isCompleted: !isCompleted }));
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (currentFilter === "ALL") return true;
        if (currentFilter === "COMPLETED") return task.completed;
        if (currentFilter === "INCOMPLETE") return !task.completed;
        return true;
      })
    : [];

  const containerClasses = viewState === "LIST" ? "flex-col" : "flex-wrap";
  return (
    <div className="flex justify-center">
      <motion.ul layout className={`w-11/12  flex gap-2 ${containerClasses}`}>
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.li
              layout
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`rounded-md ${calculateColor(task.bgCol)} transition-colors ease-out`}
            >
              <span>
                <h1>{task.heading}</h1>
                <h2>{task.creationTime}</h2>
              </span>
              <p className="text-wrap overflow-wrap break-word">{task.text}</p>
            </motion.li>
          )).reverse()}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

export default Tasks;


/*
<div
                    id="text_container"
                    className="w-full flex gap-2 items-center quicksand font-semibold "
                  >
                    <div>{task.heading}</div>
                    <div>{task.creationTime}</div>
                    <div className="w-full h-full  overflow-wrap">
                      {task.text}
                    </div>
                  </div>

                  <div
                    id="button_container"
                    className="flex items-center gap-3 smartphone:flex-col smartphone:gap-1"
                  >
                    <div
                      onClick={() =>
                        handleCompletenessTask(task.id, task.completed)
                      }
                      className={`w-fit h-fit p-[2px] rounded-lg ${
                        task.completed ? "text-green-500" : "text-red-500"
                      } transition-all`}
                    >
                      <SlideInNotifications isCompleted={task.completed} />
                    </div>
                    <Trash
                      onClick={() => handleDeleteTask(task.id)}
                      size={32}
                      weight="duotone"
                      className="hover:scale-105 transition-all"
                    />
                  </div> */