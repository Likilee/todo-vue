<template>
  <section>
    <ul>
      <li v-for="task in data" :key="task.id">
        <input type="checkbox" @change="changeTaskStatus" :id="task.title" />
        <label :for="task.title">{{ task.title }}</label>
      </li>
    </ul>
    <AppTodoInput @tasks-updated="console.log('hi')" />
  </section>
</template>

<script setup lang="ts">
  import { getTasks } from '@/services/api';
  import type { Task } from '@/services/model';
  import type { AxiosError } from 'axios';
  import { useQuery } from 'vue-query';

  const { isLoading, isError, data } = useQuery<Task[], AxiosError>('tasks', getTasks);
  const temp = () => {
    refetch();
  };
  const changeTaskStatus = (e: Event) => {
    console.log((e.target as HTMLInputElement).checked);
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
