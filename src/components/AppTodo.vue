<template>
  <button @click="() => (isEditMode = !isEditMode)">
    {{ isEditMode ? 'Edit Mode' : 'View Mode' }}
  </button>
  <section>
    <ul>
      <li v-for="task in todoTasks" :key="task.id">
        <button v-show="isEditMode" @click="removeTask(task.id)">delete</button>
        <select @change="(e) => changeTaskPriority(task.id, e)">
          <option v-for="priority in taskPriorities" :key="priority">{{ priority }}</option>
        </select>
        <span>{{ task.title }}</span>
        <button @click="changeTaskStatus(task.id, 'doing')" :disabled="isAlreadyDoingTask">
          >>
        </button>
      </li>
    </ul>
    <AppTodoInput @tasks-updated="createTask" />
  </section>
</template>

<script setup lang="ts">
  import { getTasks } from '@/services/api';
  import type { Task, TaskStatus, TaskPriority } from '@/services/model';
  import { taskPriorities } from '@/services/model';
  import type { AxiosError } from 'axios';
  import { ref, computed } from 'vue';

  // States
  const tasks = ref<Task[]>([]);
  const todoTasks = computed(() => {
    return tasks.value.filter((task) => task.status === 'todo');
  });
  const isEditMode = ref(false);
  const isAlreadyDoingTask = computed(() => {
    return tasks.value.find(({ status }) => status === 'doing') ? true : false;
  });

  // Handler
  const createTask = (task: Task) => {
    tasks.value.push(task);
  };

  const removeTask = (taskId: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  };

  const changeTaskStatus = (taskId: string, status: TaskStatus) => {
    const targetTask = tasks.value.find(({ id }) => id === taskId);
    targetTask ? (targetTask.status = status) : null;
  };

  const changeTaskPriority = (taskId: string, e: Event) => {
    const targetTask = tasks.value.find(({ id }) => id === taskId);
    const priority = (e.target as HTMLSelectElement).value as TaskPriority;
    targetTask ? (targetTask.priority = priority) : null;
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
