import { ADD_TASK, DELETE_TASK, FILTER_TASK, ISCOMPLETED_TASK, FETCH_TASKS_SUCCESS } from './TaskActions';

const initialState = {
  tasks: [],
  filter: "ALL"
};
// Reducers functions
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { id: action.payload.id, text: action.payload.text, completed: false }],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
      case FILTER_TASK:
        return {
          ...state,
          filter: action.payload,
        };
      
    case ISCOMPLETED_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
