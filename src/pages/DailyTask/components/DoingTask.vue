<template>
  <div v-if="doingTask">
    <div>{{ doingTask.title }}</div>
    <textarea v-model="memo" placeholder="Doing Memo"></textarea>
    <button @click="saveMemo">Save</button>
    <div>
      <button @click="() => changeTaskStatus(doingTask.id, 'todo')">{{ '<< To do' }}</button>
      <button @click="() => changeTaskStatus(doingTask.id, 'done')">{{ 'Done >>' }}</button>
    </div>
  </div>
  <div v-else>진행중인 업무가 없어요!!</div>
</template>

<script setup lang="ts">
  import { taskMutationKey } from '@/keys';
  import type { Task } from '@/services/model';
  import { ref, inject, onMounted } from 'vue';

  const props = defineProps<{
    doingTask: Task | null;
  }>();

  const { updateTask, changeTaskStatus } = inject(taskMutationKey);

  const memo = ref('');

  onMounted(() => {
    console.log('mounted');
    memo.value = props.doingTask?.description || '';
  });

  //❓ Save 버튼을 만들지않고 Description을 변경할 때마다 저장되도록 하고싶다.
  const saveMemo = () => {
    updateTask(props.doingTask?.id, { description: memo.value });
  };
</script>
