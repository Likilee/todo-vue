import type { Task } from './model';
import axios from 'axios';

export const getTasks = async () => {
  return (
    await axios.get('/tasks', {
      responseType: 'json',
    })
  ).data;
};

export const createTasks = async (newTask: Task) => {
  return await axios.post('/tasks', newTask);
};
