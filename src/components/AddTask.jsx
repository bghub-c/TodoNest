import { useState } from "react";
import { useSelector } from "react-redux";
import { Plus } from "@phosphor-icons/react";
import TaskForm from "./TaskForm";
import { AnimatePresence } from "framer-motion";

const AddTask = () => {
  const [isClicked, setIsClicked] = useState(false);
  const isDarkmode = useSelector((state) => state.tasks.darkMode);

  return (
    <>
      <AnimatePresence>{isClicked && <TaskForm isClicked={isClicked} setIsClicked={setIsClicked} />}</AnimatePresence>
      <section className="w-screen flex items-center justify-between text-5xl roboto-condensed font-thin tracking-tighter px-5 py-3 transition-all ease-in-out">
        <h1>Your Tasks</h1>
        <button
          onClick={() => setIsClicked(!isClicked)}
          className={`p-3 border-2 rounded-xl ${
            isDarkmode
              ? "hover:bg-white hover:text-bg1 hover:border-black"
              : "hover:bg-bg1 hover:text-white hover:border-white"
          } hover:shadow-lg shadow-white transition-all ease-out`}
        >
          <Plus size={25} weight="regular" />
        </button>
      </section>
    </>
  );
};

export default AddTask;
