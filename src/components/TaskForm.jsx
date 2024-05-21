import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Global_state-redux/TaskActions";
import PropTypes from "prop-types";
import ColorButtons from "./ColorButtons";

const TaskForm = ({ isClicked, setIsClicked }) => {
  const dispatch = useDispatch();
  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  const [taskHeading, setTaskHeading] = useState("");
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskHeading = formData.get("taskHeading");
    const taskText = formData.get("taskText");
    const taskbgCol = formData.get("taskbgCol");
    if (taskText.trim() !== "") {
      dispatch(addTask(taskText, taskHeading, taskbgCol));
      setIsClicked(false);
    }
  };

  const handleButtonClick = (color) => {
    document.getElementById("taskbgCol").value = color;
  };

  const handleKeyPress = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(nextField).focus();
    }
  };

  return (
    <>
      {isClicked && (
        <>
          <section className="absolute top-0 z-30 w-screen h-screen flex items-center justify-center text-gray-900">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsClicked(false)}
              className={`z-10 w-full h-full backdrop-blur ${
                !isDarkmode ? "bg-black/70" : ""
              } absolute`}
            ></motion.div>
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="z-20 w-fit bg-bg1 grid place-content-center p-6 rounded-lg shadow-2xl shadow-black/50"
            >
              <p className="text-4xl tracking-tighter roboto-condensed my-1 mb-20 laptop:mb-8 text-slate-200">
                Let&apos;s craft a new to-do!🚀
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="relative z-10">
                  <label
                    className={`absolute left-2  text-sm text-white nunito tracking-tight transition-all ease-in-out duration-500 ${
                      taskHeading ? "-top-5" : "top-0 opacity-0"
                    }`}
                  >
                    Type an eye catchy title
                  </label>
                  <input
                    type="text"
                    name="taskHeading"
                    value={taskHeading}
                    onChange={(e) => setTaskHeading(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "taskText")}
                    placeholder="✏️ The heading here"
                    className="px-2 py-3 w-full rounded-md border-2 border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-700 placeholder:text-md bg-slate-100"
                  />
                </div>
                <div className="relative z-10">
                  <label
                    className={`absolute left-2 text-sm text-white nunito tracking-tight transition-all duration-500 ${
                      taskText ? "-top-5" : "top-0 opacity-0"
                    }`}
                  >
                    Writing stuff will make it happen
                  </label>
                  <label
                    className={`absolute left-3 text-md text-gray-700 transition-all nunito tracking-tight top-3 ${
                      taskText ? "hidden" : ""
                    }`}
                  >
                    📝 Your To-Do here...
                  </label>
                  
                  <textarea
                  id="textinput"
                    type="text"
                    name="taskText"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "taskbgCol")}
                    className="w-full p-3 h-28 align-top text-left focus:border-blue-500 outline-none rounded-md border-2 border-gray-300 bg-slate-100 overflow-wrap break-word text-wrap"
                  />
                </div>
                <input type="hidden" id="taskbgCol" name="taskbgCol" value="" />
                <div className="flex gap-4 items-center">
                  <ColorButtons func={handleButtonClick} />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add task
                </button>
              </form>
            </motion.div>
          </section>
        </>
      )}
    </>
  );
};

TaskForm.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  setIsClicked: PropTypes.func.isRequired,
};

export default TaskForm;
