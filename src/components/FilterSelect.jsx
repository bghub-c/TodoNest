import { useDispatch, useSelector } from "react-redux";
import { FilterTask, ViewState } from "../Global_state-redux/TaskActions"; // Import viewState action creator
import { useState } from "react";
import { ListBullets, SquaresFour } from "@phosphor-icons/react";

const FilterSelect = () => {
  // Components that filter Tasks
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);
  const isDarkmode = useSelector(state => state.tasks.darkMode);
  const [viewState, setViewState] = useState(
    useSelector((state) => state.tasks.viewState)
  ); // Rename setviewState to setViewState

  const handleFilter = (filter) => {
    dispatch(FilterTask(filter));
  };

  const handleViewState = (view) => {
    dispatch(ViewState(view));
    setViewState(view);
  };

  return (
    <section className="h-12 px-5 w-screen flex items-center justify-between">
      <select
        className={`h-fit w-fit py-2 text-sm rounded-lg focus:outline-none uppercase pr-3 pl-1 ${isDarkmode?"text-bg1":"text-black bg-black/10"} transition-all ease-out duration-700`}
        value={currentFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="ALL">Default</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>
      <span className="h-full flex gap-2">
        <button value="GRID" onClick={() => handleViewState("GRID")} className={`${isDarkmode?"text-w1":"text-black/60"} transition-all ease-out duration-700`}>
        <SquaresFour size={32} weight={`${viewState==="GRID"?"bold":"light"}`} />
        </button>
        <button value="LIST" onClick={() => handleViewState("LIST")} className={`${isDarkmode?"text-w1":"text-black/60"} transition-all ease-out duration-700`}>
        <ListBullets size={32} weight={`${viewState==="LIST"?"bold":"light"}`} />
        </button>
      </span>
    </section>
  );
};
export default FilterSelect;
