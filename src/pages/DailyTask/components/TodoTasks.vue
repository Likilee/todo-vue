<template>
  <AppButton @click="toggleEditMode">{{ isEditMode ? 'Edit Mode' : 'View Mode' }}</AppButton>
  <AppList>
    <AppListItem v-for="task in tasks" :key="task.id">
      <AppButton v-if="isEditMode" @click="deleteTask(task.id)">delete task</AppButton>
      <AppSelect @change="(e) => changeTaskPriority(task.id, e)">
        <AppSelectOption>{{ DEFAULT_PRIORITY }}</AppSelectOption>
        <AppSelectOption
          v-for="priority in taskPriorities"
          :key="priority"
          :selected="task.priority === priority"
          v-show="task.priority !== priority && restSelectableOptions.includes(priority)"
        >
          {{ priority }}
        </AppSelectOption>
      </AppSelect>
      <AppListItemText>{{ task.title }}</AppListItemText>
      <AppButton @click="() => changeTaskStatus(task.id, 'doing')" :disabled="doingTaskExist">
        >>
      </AppButton>
    </AppListItem>
  </AppList>
  <AppInputText :addTask="addTask" placeholder="Add new task" />
</template>

<script setup lang="ts">
  import AppButton from '@/components/Button/AppButton.vue';
  import type { Task } from '@/services/model';
  import { taskPriorities } from '@/services/model';
  import { computed, inject, ref } from 'vue';
  import AppList from '@/components/List/AppList.vue';
  import AppListItem from '@/components/List/AppListItem.vue';
  import AppListItemText from '@/components/List/AppListItemText.vue';
  import AppSelect from '@/components/Select/AppSelect.vue';
  import AppSelectOption from '@/components/Select/AppSelectOption.vue';
  import AppInputText from '@/components/Inputs/AppInputText.vue';
  import { taskMutationKey } from '@/keys';

  const { addTask, deleteTask, changeTaskStatus, changeTaskPriority } = inject(taskMutationKey);

  const props = defineProps<{
    tasks: Task[];
    doingTaskExist: boolean;
  }>();

  const isEditMode = ref(false);

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
  };

  const DEFAULT_PRIORITY = '-priority-';

  const restSelectableOptions = computed(() => {
    const selectedOptions = props.tasks.map(({ priority }) => priority);
    return taskPriorities.filter((option) => !selectedOptions.includes(option));
  });
</script>

<style scoped lang="scss"></style>
