<template>
  <!-- ❓ v-if 디렉티브 하위 엘리먼트에서 doingTask 가 nullable 로 나오는 부분 처리 어떻게 하나요? -->
  <div class="container" v-if="doingTask">
    <h1>{{ doingTask.title }}</h1>
    <textarea v-model="memo" placeholder="Doing Memo"></textarea>
    <div>
      <button @click="saveMemo">Save</button>
    </div>
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

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    h1 {
      margin: 10px;
      color: #967e76;
    }
    textarea {
      width: 80%;
      height: 400px;
      padding: 10px;
      margin: 10px auto;
    }
    button {
      border: none;
      border-radius: 10px;
      margin: 5px;
      width: 100px;
      height: 40px;
      &:hover {
        background-color: #b7c4cf;
      }
    }
  }
</style>
