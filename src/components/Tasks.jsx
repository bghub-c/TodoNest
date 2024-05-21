import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import TaskModal from "./TaskModal";
import { Smiley, SmileyBlank, SmileyMelting, SmileyXEyes } from "@phosphor-icons/react";
import { fetchTasks } from "../Global_state-redux/TaskActions";

const Tasks = () => {
  const dispatch=useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const state = useSelector((state) => state.tasks);
  const tasks = state.tasks;
  const currentFilter = state.filter;
  const viewState = state.viewState;
  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch fetchTasks action only once when component mounts
  }, [dispatch]);
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
    <div className="flex justify-center items-center">
      {filteredTasks.length ? (
        <>
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
                      <h1>{task.heading}</h1>
                      <h2>{task.creationTime}</h2>
                    </span>
                    <p
                      className={`text-wrap overflow-wrap break-word ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.text}
                    </p>
                  </motion.li>
                ))
                .reverse()}
            </AnimatePresence>
          </motion.ul>
          <AnimatePresence>
            {selectedTask && (
              <TaskModal
                task={selectedTask}
                setSelectedTask={setSelectedTask}
                colorfunc={calculateColor}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="text-2xl tracking-tight h-full w-full flex smartphone:flex-col items-center justify-center text-center gap-1 mt-36 nunito">
  {currentFilter !== "ALL" && (
    <>
      {currentFilter === "COMPLETED" ? (
        <>
        <SmileyXEyes size={"100%"}className="text-yellow-400 w-14 laptop:w-28 " weight="duotone" /> Looks like you haven&apos;t completed any tasks yet!<br />{"(Or haven't added any)"}
          
        </>
      ) : (
        <>
          <Smiley size={"100%"}className="text-yellow-400 w-14 laptop:w-28 " weight="duotone" /> Yay, you have completed all the tasks <br />{"(Or haven't added any)"}
        </>
      )}
    </>
  )}

  {currentFilter === "ALL" && (
    <>
      {filteredTasks.length === 0 ? (
        <>
          <SmileyMelting size={"100%"}className="text-yellow-400 w-14 laptop:w-28 " weight="duotone" /> You haven&apos;t added any tasks yet!
        </>
      ) : (
        <>
          <SmileyBlank size={"100%"}className="text-yellow-400 w-14 laptop:w-28 " weight="duotone" /> Looks like you have done all the tasks!
        </>
      )}
    </>
  )}
</div>

      )}
    </div>
  );
};

export default Tasks;
