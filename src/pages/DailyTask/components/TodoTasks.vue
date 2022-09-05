<template>
  <AppButton @click="toggleEditMode">{{ isEditMode ? 'Edit Mode' : 'View Mode' }}</AppButton>
  <AppList>
    <AppListItem v-for="task in tasks" :key="task.id">
      <AppButton v-if="isEditMode">delete task</AppButton>
      <AppSelect @change="(e) => changeTaskPriority(task.id, e)">
        <AppSelectOption>{{ DEFAULT_PRIORITY }}</AppSelectOption>
        <AppSelectOption v-for="priority in taskPriorities" :key="priority">
          {{ priority }}
        </AppSelectOption>
      </AppSelect>
      <AppListItemText>{{ task.title }}</AppListItemText>
    </AppListItem>
  </AppList>
</template>

<script setup lang="ts">
  import AppButton from '@/components/Button/AppButton.vue';
  import type { Task, TaskPriority } from '@/services/model';
  import { taskPriorities } from '@/services/model';
  import { ref } from 'vue';
  import AppList from '@/components/List/AppList.vue';
  import AppListItem from '@/components/List/AppListItem.vue';
  import AppListItemText from '../../../components/List/AppListItemText.vue';
  import AppSelect from '../../../components/Select/AppSelect.vue';
  import AppSelectOption from '../../../components/Select/AppSelectOption.vue';
  import AppInputText from '../../../components/Inputs/AppInputText.vue';
  import useCreateTask from '@/services/useCreateTask';
  import useRemoveTask from '@/services/useRemoveTask';
  import useUpdateTask from '@/services/useUpdateTask';
  import { v4 as uuidV4 } from 'uuid';
  const createTask = useCreateTask('get-tasks');
  const removeTask = useRemoveTask('get-tasks');
  const updateTask = useUpdateTask('get-tasks');

  const props = defineProps<{
    tasks: Task[];
  }>();

  const isEditMode = ref(false);

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
  };

  const addTask = (e: Event) => {
    const title = (e.target as HTMLInputElement).value;
    const newTask: Task = {
      id: uuidV4(),
      title,
      description: '',
      status: 'todo',
    };
    createTask.mutate(newTask);
  };

  const deleteTask = (id: string) => {
    removeTask.mutate(id);
  };

  const changeTaskPriority = (taskId: string, e: Event) => {
    const targetTask = props.tasks.find(({ id }) => id === taskId);
    if (!targetTask) return;
    const priority = (e.target as HTMLSelectElement).value as
      | TaskPriority
      | typeof DEFAULT_PRIORITY;
    console.log('Prir', priority);
    updateTask.mutate({
      id: taskId,
      options: { priority: priority === DEFAULT_PRIORITY ? undefined : priority },
    });
  };
  const DEFAULT_PRIORITY = '-priority-';
</script>

<style scoped lang="scss"></style>
