<template>
  <section v-if="isLoading">...Loading</section>
  <section v-if="isError">...Error</section>
  <section>
    <ul>
      <li v-for="task in tasks" :key="task.id">
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
  import { useQuery } from 'vue-query';

  const { isLoading, isError, data } = useQuery<Task[], AxiosError>('tasks', getTasks);
  const tasks = ref<Task[]>([]);
  // const isEditMode = ref(false);
  watch(data, (newData) => {
    tasks.value = newData || [];
  });

  const createTask = (task: Task) => {
    tasks.value.push(task);
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
