export type TaskStatus = 'todo' | 'doing' | 'done';
export const taskPriorities = [
  'A1',
  'A2',
  'A3',
  'A4',
  'A5',
  'B1',
  'B2',
  'B3',
  'B4',
  'B5',
  'C1',
  'C2',
  'C3',
  'C4',
  'C5',
] as const;

export type TaskPriority = typeof taskPriorities[number];
export interface Task {
  id: string;
  title: string;
  priority?: TaskPriority;
  description: string;
  status: TaskStatus;
}

export type TaskUpdateOptions = Partial<Omit<Task, 'id'>>;
