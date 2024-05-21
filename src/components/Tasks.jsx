import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import TaskModal from "./TaskModal";
import {
  Smiley,
  SmileyBlank,
  SmileyMelting,
  SmileyXEyes,
} from "@phosphor-icons/react";
import { fetchTasks } from "../Global_state-redux/TaskActions";

const Tasks = () => {
  const dispatch = useDispatch();
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
      <AnimatePresence>
        {filteredTasks.length ? (
          <>
            <motion.ul
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              layout
              className={`w-11/12 gap-3 smartphone:gap-2 p-2 ${containerClasses}`}
            >
              {filteredTasks
                .map((task, index) => (
                  <motion.li
                    layout
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className={`relative rounded-md p-4  shadow-lg ${calculateColor(
                      task.bgCol
                    )} transition-colors ease-out duration-300 overflow-hidden max-h-30 text-nowrap smartphone:min-h-20 cursor-pointer hover:shadow-2xl`}
                    onClick={() => setSelectedTask(task)}
                  >
                    <span className="block mb-4">
                      <h1 className="text-2xl tracking-wider font-semibold roboto-condensed">
                        {task.heading}
                      </h1>
                      <h2
                        className={`text-xs ml-1 flex tracking-tighter ${
                          isDarkmode ? "text-gray-100" : "text-bg1"
                        } transition-all ease-out duration-300 roboto-condensed`}
                      >
                        {task.creationTime.datePart}
                      </h2>
                    </span>
                    <p
                      className={`text-wrap max-h-8 overflow-wrap break-word font-medium text-md quicksand ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.text}
                      {task.text.length>100&& <span className={`absolute bottom-1 right-8 px-6  ${calculateColor(task.bgCol)} text-xl`}>..</span>}
                    </p>
                  </motion.li>
                ))
                .reverse()}
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
            <AnimatePresence>
              {currentFilter !== "ALL" && (
                <>
                  {currentFilter === "COMPLETED" ? (
                    <motion.div className="flex smartphone:flex-col items-center justify-center text-center gap-1"
                     initial={{ opacity: 0,  }}
                    animate={{ opacity: 1,  }}
                    exit={{ opacity: 0 }}>
                      <SmileyXEyes
                        size={"100%"}
                        className="text-yellow-400 w-14 laptop:w-28 "
                        weight="duotone"
                      />
                      Looks like you haven&apos;t completed any tasks yet!
                      <br />
                      {"(Or haven't added any)"}
                    </motion.div>
                  ) : (
                    <motion.div className="flex smartphone:flex-col items-center justify-center text-center gap-1" initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0 }}>
                      <Smiley
                        size={"100%"}
                        className="text-yellow-400 w-14 laptop:w-28 "
                        weight="duotone"
                      />{" "}
                      Yay, you have completed all the tasks <br />
                      {"(Or haven't added any)"}
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {currentFilter === "ALL" && (
                <AnimatePresence>
                  {filteredTasks.length === 0 ? (
                    <motion.div className="flex smartphone:flex-col items-center justify-center text-center gap-1" initial={{ opacity: 0,}}
                    animate={{ opacity: 1,  }}
                    exit={{ opacity: 0 }}>
                      <SmileyMelting
                        size={"100%"}
                        className="text-yellow-400 w-14 laptop:w-28 "
                        weight="duotone"
                      />
                      You haven&apos;t added any tasks yet!
                    </motion.div>
                  ) : (
                    <motion.div className="flex smartphone:flex-col items-center justify-center text-center gap-1" initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}>
                      <SmileyBlank
                        size={"100%"}
                        className="text-yellow-400 w-14 laptop:w-28 "
                        weight="duotone"
                      />
                      Looks like you have done all the tasks!
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Tasks;

