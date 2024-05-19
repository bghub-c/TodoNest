import { v4 as uuidv4 } from 'uuid';

export const DARK_MODE = 'DARK_MODE'; 
export const VIEW_STATE = 'VIEW_STATE';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const ISCOMPLETED_TASK = 'ISCOMPLETED_TASK';
export const FILTER_TASK = 'FILTER_TASK';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const CHANGE_TASK_COLOR = 'CHANGE_TASK_COLOR';

const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Fetching data from local file
export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/public/Tasks_list.json');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasksData = await response.json();
      dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasksData });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
};

export const darkMode = (isOn) => ({
  type: DARK_MODE,
  payload: {
    isOn,
  },
});

export const ViewState = (types) => ({
  type: VIEW_STATE,
  payload: {
    types,
  },
});

export const addTask = (text, heading, bgCol) => ({
  type: ADD_TASK,
  payload: {
    id: uuidv4(), // Generate a unique ID
    creationTime: `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`,
    bgCol: bgCol,
    text: text,
    heading: heading,
  },
});

export const changeTaskColor = (taskId, newColor) => ({
  type: CHANGE_TASK_COLOR,
  payload: {
    taskId,
    newColor,
  },
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const isCompleteTask = (taskId) => ({
  type: ISCOMPLETED_TASK,
  payload: taskId,
});

export const FilterTask = (filter) => ({
  type: FILTER_TASK,
  payload: filter,
});
