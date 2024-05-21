import { useDispatch, useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import Futter from "./components/Futter";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import FilterSelect from "./components/FilterSelect"
import { fetchTasks } from "./Global_state-redux/TaskActions";
import { useEffect } from "react";

export default function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch fetchTasks action only once when component mounts
  }, [dispatch]);
  const isDarkmode = useSelector(state => state.tasks.darkMode);
  return (<div className="h-full relative">
    <section className={` w-screen h-screen pb-10 overflow-x-hidden flex flex-col ${isDarkmode?"bg-bg1 text-white":""} transition-all`}>
      <Navbar />
      <AddTask />
      <FilterSelect/>
      <Tasks />
    </section>
    <Futter /></div>
  );
}
