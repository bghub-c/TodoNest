import AddTask from "./components/AddTask";
import Futter from "./components/Futter";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";

export default function App() {//calling all the functional components
  return (
    <section className="relative w-screen h-screen bg-bg1 flex flex-col items-center ">
      <Navbar />
      <Tasks />
      <AddTask />
      <Futter />
    </section>
  );
}
