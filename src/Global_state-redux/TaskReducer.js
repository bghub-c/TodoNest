import {
  ADD_TASK, DELETE_TASK, FILTER_TASK, ISCOMPLETED_TASK,
  FETCH_TASKS_SUCCESS, DARK_MODE, VIEW_STATE, CHANGE_TASK_COLOR
} from './TaskActions';

const initialState = {
  tasks: [],
  filter: "ALL",
  darkMode: true,
  viewState: "GRID",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case ADD_TASK:
      console.log("Add task", state);
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            creationTime: action.payload.creationTime,
            bgCol: action.payload.bgCol,
            text: action.payload.text,
            heading: action.payload.heading,
            completed: false, // Ensure new tasks have a default 'completed' status
          },
        ],
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
    tasks: state.tasks.map(task => {
      if (task.id === action.payload) {
        const updatedTask = { ...task, completed: !task.completed };
        return updatedTask;
      }
      else{
        console.log(action.payload)
        return task;
      }
      
    }),
  };

    case DARK_MODE:
      return {
        ...state,
        darkMode: action.payload.isOn,
      };
    case VIEW_STATE:
      return {
        ...state,
        viewState: action.payload.types,
      };
    case CHANGE_TASK_COLOR:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, bgCol: action.payload.newColor } : task
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
