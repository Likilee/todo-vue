<template>
  <input type="text" v-model="input" @keyup.enter="addTask" placeholder="Add New Task" />
</template>

<script setup lang="ts">
  import type { Task } from '@/services/model';
  import { ref } from 'vue';

  interface Emits {
    (event: 'tasks-updated', task: Task): void;
  }
  const emits = defineEmits<Emits>();

  const input = ref('');

  const addTask = (e: Event) => {
    const title = (e.target as HTMLInputElement).value;
    const newTask: Task = {
      id: new Date().toString(),
      title,
      description: '',
      status: 'todo',
    };
    emits('tasks-updated', newTask);
    input.value = '';
  };
</script>

<style scoped></style>
