<template>
  <div id="container">
    <div>{{ doingTask.title }}</div>

    <textarea v-model="doingTask.description" placeholder="Doing Memo"></textarea>
    <p class="debug">{{ doingTask.description }}</p>
    <div>
      <button @click="() => changeTaskStatus('todo')">{{ '<< To do' }}</button>
      <button @click="() => changeTaskStatus('done')">{{ 'Done >>' }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Task, TaskStatus } from '@/services/model';
  import { ref } from 'vue';

  const doingTask = ref<Task>({
    id: '000',
    description: '',
    status: 'doing',
    title: 'Dummy Doing',
  });

  const changeTaskStatus = (status: TaskStatus) => {
    doingTask.value.status = status;
  };
</script>

<style scoped lang="scss">
  .debug {
    white-space: pre-line;
  }
</style>
