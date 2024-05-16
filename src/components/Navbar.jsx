import { useDispatch, useSelector } from "react-redux";
import { darkMode } from "../Global_state-redux/TaskActions";
import { useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

export default function Navbar() {
  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  return (
    <nav
      className={` w-screen h-fit sticky top-0 text-5xl backdrop-blur-xl ${
        isDarkmode ? "backdrop-brightness-75" : "bg-slate-100"
      } transition-all ease-out`}
    >
      <div className="w-screen flex justify-between items-center px-8 py-3">
        <h6
          className={`text-sm smartphone:text-lg font-medium group-hover:tracking-widest ${
            isDarkmode ? "text-w1" : "text-zinc-900"
          } roboto-condensed transition-all ease-out duration-700 `}
        >
          Welcome!
        </h6>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

const DarkModeToggle = () => {
  const [toggled, setToggled] = useState(true);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setToggled(!toggled);
    dispatch(darkMode(!toggled));
  };

  return (
    <div
      onClick={toggleDarkMode}
      className={`w-10 h-6 p-0.5 flex items-center rounded-full transition-all ease-in-out ${
        toggled ? "bg-w1" : "bg-zinc-900"
      }`}
    >
      <div
        className={`w-5 h-5 p-0.5 flex items-center justify-center rounded-full transition-all duration-150 ease-out ${
          toggled ? "translate-x-4 bg-zinc-900" : " bg-w1"
        }`}
      >
        {!toggled ? (
          <Sun size={"100%"} weight="duotone" />
        ) : (
          <Moon size={"100%"} weight="duotone" />
        )}
      </div>
    </div>
  );
};