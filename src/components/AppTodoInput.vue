<template>
  <input type="text" v-model="input" @keyup.enter="addTask" placeholder="Add New Task" />
</template>

<script setup lang="ts">
  import { createTasks } from '@/services/api';
  import type { Task } from '@/services/model';
  import { ref } from 'vue';
  import { useMutation } from 'vue-query';

  const { isLoading, isError, mutate } = useMutation((newTask: Task) => createTasks(newTask));

  interface Emits {
    (event: 'tasks-updated'): void;
  }
  const emits = defineEmits<Emits>();

  const input = ref('');

  const addTask = (e: Event) => {
    const title = (e.target as HTMLInputElement).value;
    mutate({
      id: new Date().toString(),
      title,
      description: '',
      status: 'todo',
    });

    input.value = '';
    emits('tasks-updated');
  };
</script>

<style scoped></style>
