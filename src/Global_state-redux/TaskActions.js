//task actions

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const ISCOMPLETED_TASK = 'ISCOMPLETED_TASK';
export const FILTER_TASK = 'FILTER_TASK';
export const FETCH_TASKS_SUCCESS='FETCH_TASKS_SUCCESS';


//Fetching data from local file 
export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/public/Tasks_list.json');
      console.log(response)
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

export const addTask = (text) => ({
  type: ADD_TASK,
  payload: {
    id: new Date().getTime(),
    text,
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

