<template>
  <div v-if="isLoading">... Loading</div>
  <div v-else-if="isError">... Loading</div>

  <div v-if="doingTask" id="container">
    <div>{{ doingTask.title }}</div>

    <textarea v-model="text" placeholder="Doing Memo"></textarea>
    <p class="debug">{{ text }}</p>
    <div>
      <button @click="() => changeTaskStatus('todo')">{{ '<< To do' }}</button>
      <button @click="() => changeTaskStatus('done')">{{ 'Done >>' }}</button>
    </div>
  </div>
  <div v-else>아직 진행중인 업무가 없어요!!</div>
</template>

<script setup lang="ts">
  import { getTasks } from '@/services/api';
  import type { TaskStatus } from '@/services/model';
  import useUpdateTask from '@/services/useUpdateTask';
  import { computed, ref, watch } from 'vue';
  import { useQuery, useMutation } from 'vue-query';

  const { isLoading, isError, data } = useQuery('get-task-doing', async () =>
    getTasks({ status: 'doing' })
  );
  const updateTask = useUpdateTask('get-task-doing');

  const doingTask = computed(() => {
    return data.value ? data.value[0] : null;
  });

  const text = ref('');
  watch(data, (newValue) => {
    text.value = newValue ? newValue[0].description : '';
  });

  watch(text, (nv) => {
    doingTask.value &&
      updateTask.mutate({
        id: doingTask.value.id,
        options: {
          description: nv,
        },
      });
  });
  const changeTaskStatus = (status: TaskStatus) => {
    doingTask.value && updateTask.mutate({ id: doingTask.value.id, options: { status } });
  };
</script>

<style scoped lang="scss">
  .debug {
    white-space: pre-line;
  }
</style>
