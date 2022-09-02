<template>
  <button @click="() => (isEditMode = !isEditMode)">
    {{ isEditMode ? 'Edit Mode' : 'View Mode' }}
  </button>
  <div v-if="isLoading">... Loading</div>
  <div v-else-if="isError">... Error</div>
  <section v-else>
    <ul>
      <li v-for="task in sortedTasks" :key="task.id">
        <button v-show="isEditMode" @click="removeTask.mutate(task.id)">delete</button>
        <select @change="(e) => changeTaskPriority(task.id, e)" id="priorities">
          <option>{{ DEFAULT_PRIORITY }}</option>
          <option
            v-for="priority in taskPriorities"
            :key="priority"
            :selected="task.priority === priority"
            v-show="task.priority !== priority && restSelectableOptions.includes(priority)"
          >
            {{ priority }}
          </option>
        </select>
        <span>{{ task.title }}</span>
        <button @click="() => changeTaskStatus(task.id, 'doing')" :disabled="doingTaskExist">
          >>
        </button>
      </li>
    </ul>
    <AppTodoInput @tasks-updated="createTask.mutate" />
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { TaskStatus, TaskPriority } from '@/services/model';
  import { taskPriorities } from '@/services/model';
  import { useQuery } from 'vue-query';
  import { getTasks } from '@/services/api';
  import useCreateTask from '@/services/useCreateTask';
  import useRemoveTask from '@/services/useRemoveTask';
  import useUpdateTask from '@/services/useUpdateTask';

  const {
    isLoading,
    isError,
    data: tasks,
  } = useQuery('tasks', async () => getTasks({ status: 'todo' }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const createTask = useCreateTask();
  const removeTask = useRemoveTask();
  const updateTask = useUpdateTask();

  const sortedTasks = computed(() => {
    return (tasks.value || [])
      .filter((task) => task.status === 'todo')
      .sort((a, b) => {
        if (a.priority && b.priority) {
          if (a.priority > b.priority) return 1;
          else return -1;
        } else if (!a.priority) {
          return 1;
        } else {
          return -1;
        }
      });
  });
  const isEditMode = ref(false);
  const doingTaskExist = computed(() => {
    return (tasks.value || []).findIndex(({ status }) => status === 'doing') ? true : false;
  });

  const restSelectableOptions = computed(() => {
    const selectedOptions = sortedTasks.value.map(({ priority }) => priority);
    return taskPriorities.filter((option) => !selectedOptions.includes(option));
  });

  const changeTaskStatus = (taskId: string, status: TaskStatus) => {
    updateTask.mutate({ id: taskId, options: { status } });
  };

  const DEFAULT_PRIORITY = '-priority-';

  const changeTaskPriority = (taskId: string, e: Event) => {
    const targetTask = sortedTasks.value.find(({ id }) => id === taskId);
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
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
