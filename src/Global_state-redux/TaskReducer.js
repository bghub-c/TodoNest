import {
  ADD_TASK, DELETE_TASK, FILTER_TASK, ISCOMPLETED_TASK,
  FETCH_TASKS_SUCCESS, DARK_MODE, VIEW_STATE, CHANGE_TASK_COLOR
} from './TaskActions';

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
  ],
  filter: "ALL",
  darkMode: true,
  viewState: "GRID",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
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
          task.id === action.payload ? { ...task, completed: !task.completed } : task
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
