import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import Futter from "./components/Futter";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import FilterSelect from "./components/FilterSelect";
import { fetchTasks } from "./Global_state-redux/TaskActions";
import WelcomePage from "./components/WelcomePage";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Show WelcomePage for 1.5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch fetchTasks action only once when component mounts
  }, [dispatch]);

  const isDarkmode = useSelector(state => state.tasks.darkMode);

  return (
    <div className="h-full relative">
     <AnimatePresence> {showWelcome ? (
        <WelcomePage />
      ) : (
        <section className={`w-screen h-screen pb-10 overflow-x-hidden flex flex-col ${isDarkmode ? "bg-bg1 text-white" : ""} transition-all`}>
          <Navbar />
          <AddTask />
          <FilterSelect />
          <Tasks />
        </section>
      )}</AnimatePresence>
      <Futter />
    </div>
  );
}
