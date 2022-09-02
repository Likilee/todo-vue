import type { UpdateTasksParams } from '@/services/api';
import { rest } from 'msw';
import type { Task } from '@/services/model';
import Repository from '@/mocks/repository';

const tasksRepo = new Repository<Task[]>('tasks');

export const handlers = [
  // Get All tasks
  rest.get('/tasks', async (req, res, ctx) => {
    const status = req.url.searchParams.get('status');
    const allTasks = tasksRepo.get() || [];
    const tasks = status ? allTasks.filter((task) => task.status === status) : allTasks;
    return res(ctx.status(200), ctx.json(tasks));
  }),

  // Create a task
  rest.post('/tasks', async (req, res, ctx) => {
    const newTask: Task = await req.json();
    const tasks = tasksRepo.get() || [];
    tasksRepo.set([...tasks, newTask]);
    return res(ctx.status(201));
  }),

  rest.put('/tasks', async (req, res, ctx) => {
    const { id, options } = (await req.json()) as UpdateTasksParams;
    const tasks = tasksRepo.get() || [];
    const index = tasks.findIndex((task) => task.id === id);
    if (index >= 0) {
      tasks[index] = { ...tasks[index], ...options };
      tasksRepo.set(tasks);
    }
    return res(ctx.status(202));
  }),

  rest.delete('/tasks', async (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    console.log('id', id);
    const tasks = tasksRepo.get() || [];
    tasksRepo.set(tasks.filter((task) => task.id !== id));
    return res(ctx.status(202));
  }),
];
