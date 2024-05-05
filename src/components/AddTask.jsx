import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Global_state-redux/TaskActions"; 
import FilterSelect from "./FilterSelect";

const AddTask = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <section className="w-fullsmartphone:mt-10 flex gap-4 flex-col items-center justify-center">
        <input
          type="text"
          value={taskText}
          placeholder="Start typing your To-Do here"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="py-1 w-[300px] mt-3  bg-white border-b-2 border-dashed border-black 
          placeholder:text-black placeholder:text-center
          focus:outline-none focus:border-bg2 focus:bg-white focus:border-2 rounded-2xl focus:rounded-md"
        />
      <div id="buttons" className="flex flex-row gap-4">
        <button onClick={handleAddTask} className="rounded-2xl border-b-2 border-dashed border-black bg-white px-5 py-2  uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
          Add task
        </button>
        <FilterSelect />
      </div>
    </section>
  );
};

export default AddTask;
