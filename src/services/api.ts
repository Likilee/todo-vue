import type { Task, TaskStatus, TaskUpdateOptions } from './model';
import axios from 'axios';

interface getTasksPrams {
  status: TaskStatus;
}

export const getTaskById = async (id: string) => {
  return (
    await axios.get(`/tasks/${id}`, {
      responseType: 'json',
    })
  ).data as Task;
};

export const getTasks = async (params?: getTasksPrams) => {
  return (
    await axios.get('/tasks', {
      responseType: 'json',
      params,
    })
  ).data as Task[];
};

export const createTask = async (newTask: Task) => {
  return await axios.post('/tasks', newTask);
};

export const removeTask = async (id: string) => {
  return await axios.delete('/tasks', {
    params: {
      id,
    },
  });
};

export interface UpdateTasksParams {
  id: string;
  options: TaskUpdateOptions;
}

export const updateTask = async (reqBody: UpdateTasksParams) => {
  return await axios.put('/tasks', reqBody);
};
