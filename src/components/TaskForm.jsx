import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Global_state-redux/TaskActions";
import PropTypes from "prop-types";

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

  return (
    <>
      {isClicked && (
        <>
          <section className="absolute top-0 w-screen h-screen flex items-center justify-center">
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
              <h1 className="text-4xl tracking-tighter roboto-condensed my-1 mb-20 laptop:mb-8 text-slate-200">
                Trying to add a ToDo?
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="relative z-10">
                  <label
                    className={`absolute left-2  text-sm text-white transition-all ease-in-out ${
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
                    placeholder="✏️ The heading here"
                    className="px-2 py-3 w-full rounded-md border-2 border-gray-300 placeholder:text-gray-700 bg-slate-200"
                  />
                </div>
                <div className="relative z-10">
                  <label
                    className={`absolute left-1 text-sm text-white transition-all ${
                      taskText ? "-top-5" : "top-0 opacity-0"
                    }`}
                  >
                    Writing stuff will make it happen
                  </label>
                  <label
                    className={`absolute left-3 text-md text-gray-700 transition-all top-3 ${
                      taskText ? "hidden" : ""
                    }`}
                  >
                    📝 Your To-Do here...
                  </label>
                  <input
                    type="text"
                    name="taskText"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    className="p-2 w-full h-28 text-start rounded-md border-2 border-gray-300 bg-slate-200"
                  />
                </div>
                <input type="hidden" id="taskbgCol" name="taskbgCol" value="" />
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    onClick={() =>
                      handleButtonClick(`${isDarkmode ? "bg-white" : "bg-bg1"}`)
                    }
                    className={`px-3 py-1 rounded-md  bg-w1 ring-black text-gray-800 focus:ring shadow-lg focus:shadow-white/20`}
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("red")}
                    className="w-5 h-5 rounded-full bg-red-500 ring-offset-2 ring-offset-white focus:ring-2 ring-red-700 shadow-lg focus:shadow-red-700"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("blue")}
                    className="w-5 h-5 rounded-full bg-blue-500 ring-offset-2 ring-offset-white focus:ring-2 ring-blue-700 shadow-lg focus:shadow-blue-700"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("green")}
                    className="w-5 h-5 rounded-full bg-green-500 ring-offset-2 ring-offset-white focus:ring-2 ring-green-700 shadow-lg focus:shadow-green-700"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("yellow")}
                    className="w-5 h-5 rounded-full bg-yellow-500 ring-offset-2 ring-offset-white focus:ring-2 ring-yellow-700 shadow-lg focus:shadow-yellow-700"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("purple")}
                    className="w-5 h-5 rounded-full bg-purple-500 ring-offset-2 ring-offset-white focus:ring-2 ring-purple-700 shadow-lg focus:shadow-purple-700"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("orange")}
                    className="w-5 h-5 rounded-full bg-orange-500 ring-offset-2 ring-offset-white focus:ring-2 ring-orange-700 shadow-lg focus:shadow-orange-700"
                  ></button>
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
