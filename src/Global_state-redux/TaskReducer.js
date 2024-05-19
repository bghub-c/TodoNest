import { ADD_TASK, DELETE_TASK, FILTER_TASK, ISCOMPLETED_TASK, FETCH_TASKS_SUCCESS, DARK_MODE, VIEW_STATE, CHANGE_TASK_COLOR } from './TaskActions';

const initialState = {
  tasks: [
    {
      id: 0,
      heading: "Task 0",
      text: "Task 0 description",
      bgCol: "DEFAULT",
      completed: false,
      creationTime: "19-May-2024"
    },
    {
      id: 1,
      heading: "Task 1",
      text: "Task 1 description",
      bgCol: "AzureBreeze",
      completed: false,
      creationTime: "19-May-2024"
    },
    {
      id: 2,
      heading: "Task 2",
      text: "Task 2 description",
      bgCol: "MeadowMist",
      completed: false,
      creationTime: "19-May-2024"
    },
    {
      id: 3,
      heading: "Task 3",
      text: "Task 3 description",
      bgCol: "PeachyBlush",
      completed: false,
      creationTime: "19-May-2024"
    },
    {
      id: 4,
      heading: "Task 4",
      text: "Task 4 description",
      bgCol: "LavenderHaze",
      completed: false,
      creationTime: "19-May-2024"
    },
    {
      id: 5,
      heading: "Task 5",
      text: "Task 5 description",
      bgCol: "CoralCrush",
      completed: false,
      creationTime: "19-May-2024"
    },
    {
      id: 6,
      heading: "Task 6",
      text: "Task 6 description",
      bgCol: "MintWhisper",
      completed: false,
      creationTime: "19-May-2024"
    }
  ],
  filter: "ALL",
  darkMode: true,
  viewState:"GRID" 
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
        tasks: [...state.tasks, { id: action.payload.id,heading: action.payload.heading,creationTime: action.payload.creationTime,bgCol:action.payload.bgCol, text: action.payload.text, completed: false }],
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
      const { taskId, newColor } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, bgCol: newColor } : task
        ),
      };

    default:
      return state;
  }
};

export default taskReducer;