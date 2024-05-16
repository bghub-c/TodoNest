import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Global_state-redux/TaskActions";
import { Plus } from "@phosphor-icons/react";

const AddTask = () => {
  const dispatch = useDispatch();
  const [isClicked, setisClicked] = useState(false); 
  const isDarkmode = useSelector((state) => state.tasks.darkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskText = formData.get("taskText");
    const taskHeading = formData.get("taskHeading");
    const taskbgCol = formData.get("taskbgCol");
    if (taskText.trim() !== "") {
      dispatch(addTask(taskText, taskHeading, taskbgCol));
      setisClicked(!isClicked);
    }
  };

  const handleButtonClick = (color) => {
    document.getElementById("taskbgCol").value = color;
  };

  return (
    <>
      {isClicked ? (
        <section className="absolute w-screen flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="taskHeading"
                placeholder="Enter heading here"
                className=""
              />
              <input
                type="text"
                name="taskText"
                placeholder="Start typing your To-Do here"
                className=""
              />
              <input
                type="hidden"
                id="taskbgCol"
                name="taskbgCol"
                value=""
              />
              <span className="flex gap-4 flex-row">
              <button
                  type="button"
                  onClick={() => handleButtonClick(`${isDarkmode?"bg-white":"bg-bg1"}`)}
                  className={`px-1 ${isDarkmode?"bg-white text-bg1":"bg-bg1"} rounded-md `}
                >
                  Default
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick("bg-red-500")}
                  className="w-5 h-5 rounded-full bg-red-500 ring-offset-2 ring-offset-white focus:ring-2 ring-red-700"
                >
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick("bg-blue-500")}
                  className="w-5 h-5 rounded-full bg-blue-500 ring-offset-2 ring-offset-white focus:ring-2 ring-blue-700"
                >
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick("bg-yellow-500")}
                  className="w-5 h-5 rounded-full bg-yellow-500 ring-offset-2 ring-offset-white focus:ring-2 ring-yellow-700"
                >
                </button>
              </span>
              <button type="submit">Add task</button>
            </div>
          </form>
        </section>
      ) : (
        <section className="w-screen flex items-center justify-between text-5xl roboto-condensed font-thin tracking-tighter px-5 py-3 transition-all ease-in-out">
          <h1>Your Tasks</h1>
          <button
            onClick={() => setisClicked(!isClicked)}
            className={`p-3 border-2 rounded-xl ${
              isDarkmode
                ? " hover:bg-white hover:text-bg1 hover:border-black "
                : "hover:bg-bg1 hover:text-white hover:border-white"
            }  hover:shadow-lg shadow-white  transition-all ease-out `}
          >
            <Plus size={25} weight="regular" />
          </button>
        </section>
      )}
    </>
  );
};

export default AddTask;
