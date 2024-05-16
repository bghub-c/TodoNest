import { useSelector, useDispatch } from "react-redux";
import { deleteTask, isCompleteTask } from "../Global_state-redux/TaskActions";
import { Trash } from "@phosphor-icons/react";
import SlideInNotifications from "./SlideInNotifications";
import { AnimatePresence, motion } from "framer-motion";

const Tasks = () => {
  // Components that Renders Tasks
  const state = useSelector((state) => state.tasks);
  const tasks = state.tasks;
  
  const currentFilter = state.filter;
  const dispatch = useDispatch();
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleCompletenessTask = (taskId, isCompleted) => {
    dispatch(isCompleteTask({ id: taskId, isCompleted: !isCompleted }));
  };

const Randomcolor=()=>{
  var col;

   switch(Math.round(Math.random())){
    case 1:{
      col="bg-blue-300"
    }
   }
  return(col)
}
  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (currentFilter === "ALL") return true;
        if (currentFilter === "COMPLETED") return task.completed;
        if (currentFilter === "INCOMPLETE") return !task.completed;
        return true;
      })
    : [];

  return (
    <div className="">
      <motion.ul layout className="w-full flex flex-col">
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            filteredTasks
              .map((task, index) => (
                <motion.li
                  layout
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${task.bgCol}`}
                >
                  {task.heading}
                </motion.li>
              ))
              .reverse()
          ) : (
            <motion.li className="p-2 pb-1 flex gap-2 items-center justify-between border-b border-black/20">
              <div id="text_container" className="flex gap-2 items-center">
                <div className="w-[7px] h-[7px] rounded-full bg-black"></div>
                No Tasks
              </div>
            </motion.li>
          )}
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