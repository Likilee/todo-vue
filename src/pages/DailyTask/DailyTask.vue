<template>
  <div id="title">
    <div id="subroute-button-group">
      <AppButton @click="mode = 'todo'">To do</AppButton>
      <AppButton @click="mode = 'doing'">Doing</AppButton>
      <AppButton @click="mode = 'done'">Done</AppButton>
    </div>
    <TodoTasks
      v-if="mode === 'todo'"
      :tasks="todoTasks"
      :doing-task-exist="doingTask ? true : false"
    ></TodoTasks>
    <DoingTask v-else-if="mode === 'doing'" :doing-task="doingTask"></DoingTask>
    <DoneTasks v-else :done-tasks="doneTasks"></DoneTasks>
  </div>
</template>

<script setup lang="ts">
  import { getTasks } from '@/services/api';
  import { computed, provide, ref } from 'vue';
  import { useQuery } from 'vue-query';
  import type { Task, TaskPriority, TaskStatus, TaskUpdateOptions } from '@/services/model';
  import AppButton from '@/components/Button/AppButton.vue';
  import TodoTasks from './components/TodoTasks.vue';
  import DoingTask from './components/DoingTask.vue';
  import useCreateTask from '@/services/useCreateTask';
  import useRemoveTask from '@/services/useRemoveTask';
  import useUpdateTask from '@/services/useUpdateTask';
  import { v4 as uuidV4 } from 'uuid';
  import { taskMutationKey } from '@/keys';
  import DoneTasks from './components/DoneTasks.vue';

  const { isLoading, isError, data } = useQuery('get-tasks', async () => getTasks());
  const createTaskMutation = useCreateTask('get-tasks');
  const removeTaskMutation = useRemoveTask('get-tasks');
  const updateTaskMutation = useUpdateTask('get-tasks');
  const mode = ref<TaskStatus>('todo');

  const todoTasks = computed(() => {
    const priorityCmp = (a: Task, b: Task) => {
      if (a.priority && b.priority) {
        if (a.priority > b.priority) return 1;
        else return -1;
      } else if (!a.priority) {
        return 1;
      } else {
        return -1;
      }
    };
    return (data.value || []).filter((task) => task.status === 'todo').sort(priorityCmp);
  });

  const doingTask = computed(() => {
    if (!data.value) return null;
    else {
      const doing = data.value.filter((task) => task.status === 'doing');
      return doing[0] || null;
    }
  });

  // TODO : 만일 Done Tasks도 정렬일 필요하다면정렬 규칙 추가.
  const doneTasks = computed(() => {
    return (data.value || []).filter((task) => task.status === 'done');
  });

  const addTask = (e: Event) => {
    const title = (e.target as HTMLInputElement).value;
    const newTask: Task = {
      id: uuidV4(),
      title,
      description: '',
      status: 'todo',
    };
    createTaskMutation.mutate(newTask);
  };

  const deleteTask = (id: string) => {
    removeTaskMutation.mutate(id);
  };

  const DEFAULT_PRIORITY = '-priority-';

  const changeTaskPriority = (taskId: string, e: Event) => {
    const targetTask = todoTasks.value.find(({ id }) => id === taskId);
    if (!targetTask) return;
    const priority = (e.target as HTMLSelectElement).value as
      | TaskPriority
      | typeof DEFAULT_PRIORITY;
    updateTaskMutation.mutate({
      id: taskId,
      options: { priority: priority === DEFAULT_PRIORITY ? undefined : priority },
    });
  };

  const changeTaskStatus = (taskId: string, status: TaskStatus) => {
    updateTaskMutation.mutate({ id: taskId, options: { status } });
  };

  const updateTask = (taskId: string, options: TaskUpdateOptions) => {
    updateTaskMutation.mutate({ id: taskId, options: options });
  };

  provide(taskMutationKey, {
    addTask,
    deleteTask,
    changeTaskPriority,
    changeTaskStatus,
    updateTask,
  });
</script>

<style scoped>
  #title {
    text-align: center;
  }

  ul {
    list-style-type: none;
  }
</style>
