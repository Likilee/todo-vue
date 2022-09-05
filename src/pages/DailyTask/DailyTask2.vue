<template>
  <div id="title">
    <div id="subroute-button-group">
      <AppButton @click="mode = 'todo'">To do</AppButton>
      <AppButton @click="mode = 'doing'">Doing</AppButton>
      <AppButton @click="mode = 'done'">Done</AppButton>
    </div>
    <TodoTasks v-if="(mode = 'todo')" :tasks="todoTasks"></TodoTasks>
    <!-- <TodoTasks v-else-if="(mode = 'doing')"></TodoTasks>
    <TodoTasks v-else></TodoTasks> -->
  </div>
</template>

<script setup lang="ts">
  import { getTasks } from '@/services/api';
  import { computed, ref } from 'vue';
  import { useQuery } from 'vue-query';
  import type { Task, TaskStatus } from '@/services/model';
  import AppButton from '../../components/Button/AppButton.vue';
  import TodoTasks from './components/TodoTasks.vue';

  const { isLoading, isError, data } = useQuery('get-tasks', async () => getTasks());

  const mode = ref<TaskStatus>('todo');
  const isEditMode = ref(false);

  const toggleMode = () => {
    isEditMode.value = !isEditMode.value;
  };

  const todoTasks = computed(() => {
    const priorityCmp = (a: Task, b: Task) => {
      if (a.priority && b.priority) {
        if (a.priority > b.priority) return 1;
        else return -1;
      } else if (!a.priority) {
        return 1;
      } else {
        return -1;
      }
    };
    return (data.value || []).filter((task) => task.status === 'todo').sort(priorityCmp);
  });

  const doingTask = computed(() => {
    if (!data.value) return null;
    else {
      const doing = data.value.filter((task) => task.status === 'doing');
      return doing[0] || null;
    }
  });

  // TODO : 만일 Done Tasks도 정렬일 필요하다면정렬 규칙 추가.
  const doneTasks = computed(() => {
    return (data.value || []).filter((task) => task.status === 'done');
  });
</script>

<style scoped>
  #title {
    text-align: center;
  }

  ul {
    list-style-type: none;
  }
</style>
