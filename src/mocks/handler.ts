import { rest } from 'msw';
import type { Task } from '@/services/model';
import Repository from '@/mocks/repository';

const tasksRepo = new Repository<Task[]>('tasks');

const tasksMock: Task[] = [
  {
    id: '000',
    title: '임시 데이터',
    description: '',
    status: 'doing',
  },
];
export const handlers = [
  // Get All tasks
  rest.get('/tasks', async (req, res, ctx) => {
    const tasks = tasksRepo.get();
    return res(ctx.status(200), ctx.json(tasks));
  }),

  // Create a task
  rest.post('/tasks', async (req, res, ctx) => {
    const newTask: Task = await req.json();
    const tasks = tasksRepo.get() || [];
    tasksRepo.set([...tasks, newTask]);
    return res(ctx.status(201));
  }),
];
