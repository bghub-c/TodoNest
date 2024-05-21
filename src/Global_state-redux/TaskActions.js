import { v4 as uuidv4 } from 'uuid';

// Action Types
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
  "January", "February", "March", "April", "May", "June", "July", "August",
  "September", "October", "November", "December",
];



// Action Creators
export const darkMode = (isOn) => ({
  type: DARK_MODE,
  payload: { isOn },
});

export const ViewState = (types) => ({
  type: VIEW_STATE,
  payload: { types },
});

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const retrievedString = localStorage.getItem("myObjectKey");
      const retrievedObject = JSON.parse(retrievedString) || [];
      dispatch({ type: FETCH_TASKS_SUCCESS, payload: { tasks: retrievedObject } });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
};

const updateLocalStorage = (tasks) => {
  localStorage.setItem("myObjectKey", JSON.stringify(tasks));
};

export const addTask = (text, heading, bgCol) => (dispatch, getState) => {
  const newTask = {
    id: uuidv4(),
    creationTime: `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`,
    bgCol: bgCol,
    text: text,
    heading: heading,
  };
  dispatch({ type: ADD_TASK, payload: newTask });
  updateLocalStorage(getState().tasks.tasks);
};

export const changeTaskColor = (taskId, newColor) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_TASK_COLOR,
    payload: { taskId, newColor },
  });
  updateLocalStorage(getState().tasks.tasks);
};

export const deleteTask = (taskId) => (dispatch, getState) => {
  dispatch({
    type: DELETE_TASK,
    payload: taskId,
  });
  updateLocalStorage(getState().tasks.tasks);
};

export const isCompleteTask = (taskId) => (dispatch, getState) => {
  dispatch({
    type: ISCOMPLETED_TASK,
    payload: taskId.id,
  });
  updateLocalStorage(getState().tasks.tasks);
};

export const FilterTask = (filter) => (dispatch, getState) => {
  dispatch({
    type: FILTER_TASK,
    payload: filter,
  });
  updateLocalStorage(getState().tasks.tasks);
};