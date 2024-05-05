
import { useDispatch, useSelector } from 'react-redux';
import { FilterTask } from '../Global_state-redux/TaskActions';

const FilterSelect = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filter);

  const handleFilter = (filter) => {
    dispatch(FilterTask(filter));
  };
  
  return (
    <div className="h-full flex items-center">
      <select
        className="h-full bg-white text-sm px-2 py-1 rounded-2xl border-b-2 border-dashed border-black focus:outline-none uppercase"
        value={currentFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="ALL">Default</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>
    </div>
  );
};

export default FilterSelect;
