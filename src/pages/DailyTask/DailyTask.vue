<template>
  <main>
    <!-- ❓ 버튼 그룹에서 active 클래스를 부여하는 더 적절한 방법이 있을까요? -->
    <nav>
      <AppButton :class="mode === 'todo' && 'active'" @click="mode = 'todo'">To do</AppButton>
      <AppButton :class="mode === 'doing' && 'active'" @click="mode = 'doing'">Doing</AppButton>
      <AppButton :class="mode === 'done' && 'active'" @click="mode = 'done'">Done</AppButton>
    </nav>
    <!-- ❓ Dynamic component 기능을 사용해서 개선할 여지가 있을까요? 개선 한다면 어떤식으로 가능한가요 -->
    <TodoTasks
      v-if="mode === 'todo'"
      :tasks="todoTasks"
      :doing-task-exist="doingTask ? true : false"
    ></TodoTasks>
    <DoingTask v-else-if="mode === 'doing'" :doing-task="doingTask"></DoingTask>
    <DoneTasks v-else :done-tasks="doneTasks"></DoneTasks>
  </main>
</template>

<script setup lang="ts">
  import { getTasks } from '@/services/api';
  import { computed, provide, ref } from 'vue';
  import { useQuery } from 'vue-query';
  import type { Task, TaskPriority, TaskStatus, TaskUpdateOptions } from '@/services/model';
  import useCreateTask from '@/services/useCreateTask';
  import useRemoveTask from '@/services/useRemoveTask';
  import useUpdateTask from '@/services/useUpdateTask';
  import { v4 as uuidV4 } from 'uuid';
  import { taskMutationKey } from '@/keys';
  import TodoTasks from '@/pages/DailyTask/components/TodoTasks.vue';
  import DoingTask from '@/pages/DailyTask/components/DoingTask.vue';
  import DoneTasks from '@/pages/DailyTask/components/DoneTasks.vue';

  // ❓ Suspense 컴포넌트로 Wrapping 하여 loading을 처리
  const { data } = useQuery('get-tasks', async () => getTasks());
  const createTaskMutation = useCreateTask('get-tasks');
  const removeTaskMutation = useRemoveTask('get-tasks');
  const updateTaskMutation = useUpdateTask('get-tasks');
  const mode = ref<TaskStatus>('todo');

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

  const addTask = (e: Event) => {
    const title = (e.target as HTMLInputElement).value;
    const newTask: Task = {
      id: uuidV4(),
      title,
      description: '',
      status: 'todo',
    };
    createTaskMutation.mutate(newTask);
  };

  const deleteTask = (id: string) => {
    removeTaskMutation.mutate(id);
  };

  const DEFAULT_PRIORITY = '✔️';

  const changeTaskPriority = (taskId: string, e: Event) => {
    const targetTask = todoTasks.value.find(({ id }) => id === taskId);
    if (!targetTask) return;
    const priority = (e.target as HTMLSelectElement).value as
      | TaskPriority
      | typeof DEFAULT_PRIORITY;
    updateTaskMutation.mutate({
      id: taskId,
      options: { priority: priority === DEFAULT_PRIORITY ? undefined : priority },
    });
  };

  const changeTaskStatus = (taskId: string, status: TaskStatus) => {
    updateTaskMutation.mutate({ id: taskId, options: { status } });
  };

  const updateTask = (taskId: string, options: TaskUpdateOptions) => {
    updateTaskMutation.mutate({ id: taskId, options: options });
  };

  provide(taskMutationKey, {
    addTask,
    deleteTask,
    changeTaskPriority,
    changeTaskStatus,
    updateTask,
  });
</script>

<style lang="scss" scoped>
  main {
    position: relative;
  }
  nav {
    display: flex;
    height: 40px;
    justify-content: center;
    background-color: #d7c0ae;
    margin-bottom: 20px;

    button {
      margin: 0 px;
      flex: auto;
      border: none;
      border-radius: 5px 5px 0 0;
      &:hover {
        background-color: #b7c4cf;
      }
      &.active {
        background-color: #eee3cb;
      }
    }
  }
  ul {
    list-style-type: none;
  }
</style>
