<template>
  <button @click="() => (isEditMode = !isEditMode)">
    {{ isEditMode ? 'Edit Mode' : 'View Mode' }}
  </button>
  <section>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <button v-show="isEditMode" @click="removeTask(task.id)">delete</button>
        {{ task.title }}
        <button>>></button>
      </li>
    </ul>
    <AppTodoInput @tasks-updated="createTask" />
  </section>
</template>

<script setup lang="ts">
  import { getTasks } from '@/services/api';
  import type { Task } from '@/services/model';
  import type { AxiosError } from 'axios';
  import { ref, watch } from 'vue';

  const tasks = ref<Task[]>([]);
  const isEditMode = ref(false);
  // watch(data, (newData, oldData) => {
  //   tasks.value = newData || oldData || [];
  // });

  const createTask = (task: Task) => {
    tasks.value.push(task);
  };

  const removeTask = (taskId: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
