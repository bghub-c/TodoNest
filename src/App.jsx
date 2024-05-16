import { useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import Futter from "./components/Futter";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import FilterSelect from "./components/FilterSelect"

export default function App() {
  const isDarkmode = useSelector(state => state.tasks.darkMode);
  return (
    <section className={` w-screen h-screen overflow-x-hidden ${isDarkmode?"bg-bg1 text-white border-white":""} transition-all`}>
      <Navbar />
      <AddTask />
      <FilterSelect/>
      <Tasks />
      <Futter />
    </section>
  );
}
