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
          <section className="absolute top-0 w-screen h-screen flex items-center justify-center text-gray-900">
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
                    className={`px-3 py-1 rounded-md  bg-w1 ring-black text-gray-800 hover:ring-2 focus:ring-2 focus:scale-105 transition-all shadow-lg focus:shadow-white/20`}
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("AzureBreeze")}
                    className="w-5 h-5 rounded-full bg-c1lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all  ring-c1lt shadow-lg focus:shadow-c1"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("MeadowMist")}
                    className="w-5 h-5 rounded-full bg-c2lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c2lt shadow-lg focus:shadow-c2/50"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("PeachyBlush")}
                    className="w-5 h-5 rounded-full bg-c3lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c3lt shadow-lg focus:shadow-c3/50"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("LavenderHaze")}
                    className="w-5 h-5 rounded-full bg-c4lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c4 shadow-lg focus:shadow-c4/50"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("CoralCrush")}
                    className="w-5 h-5 rounded-full bg-c5lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c5 shadow-lg focus:shadow-c5/50"
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleButtonClick("MintWhisper")}
                    className="w-5 h-5 rounded-full bg-c6lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 focus:scale-105 transition-all ring-c6lt shadow-lg focus:shadow-c6/50"
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