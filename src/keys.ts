import type { InjectionKey } from 'vue';
import type { TaskStatus, TaskUpdateOptions } from './services/model';

export const taskMutationKey = Symbol() as InjectionKey<{
  addTask: (e: Event) => void;
  deleteTask: (id: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  changeTaskPriority: (taskId: string, e: Event) => void;
  updateTask: (id: string, options: TaskUpdateOptions) => void;
}>;
