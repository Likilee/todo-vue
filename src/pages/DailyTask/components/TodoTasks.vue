<template>
  <div class="container">
    <AppButton class="dial" @click="toggleEditMode">{{ isEditMode ? 'Edit' : 'View' }}</AppButton>
    <AppInputText v-focus class="input" :addTask="addTask" placeholder="Add new task" />
    <AppList class="task__list">
      <AppListItem class="task__item" v-for="task in tasks" :key="task.id">
        <AppSelect class="task__item__selector" @change="(e) => changeTaskPriority(task.id, e)">
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
        <AppListItemText class="task__item__text">{{ task.title }}</AppListItemText>

        <AppButton
          v-if="!isEditMode"
          class="task__item__button doing"
          @click="() => changeTaskStatus(task.id, 'doing')"
          :disabled="doingTaskExist"
        >
          ▶️
        </AppButton>
        <AppButton class="task__item__button delete" v-else @click="deleteTask(task.id)"
          >🗑️</AppButton
        >
      </AppListItem>
    </AppList>
  </div>
</template>

<script setup lang="ts">
  import type { Task } from '@/services/model';
  import { taskPriorities } from '@/services/model';
  import { computed, inject, ref } from 'vue';
  import { taskMutationKey } from '@/keys';
  import vFocus from '@/utils/directives/Focus';

  // ❓ Symbol의 Type을 잘 지정해준거 같은데 에러가 발생하네요 ㅜㅜ
  const { addTask, deleteTask, changeTaskStatus, changeTaskPriority } = inject(taskMutationKey);

  const props = defineProps<{
    tasks: Task[];
    doingTaskExist: boolean;
  }>();

  const isEditMode = ref(false);

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
  };

  const DEFAULT_PRIORITY = '✔️';

  const restSelectableOptions = computed(() => {
    const selectedOptions = props.tasks.map(({ priority }) => priority);
    return taskPriorities.filter((option) => !selectedOptions.includes(option));
  });
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .input {
    margin: auto;
    padding: 0 10px;
    width: 80%;
    height: 50px;
    font-family: 'Courier New', Courier, monospace;
    font-size: large;
    border: 0px solid black;
    border-radius: 10px;

    &:focus {
      outline: 3px solid #b7c4cf;
    }
  }

  .dial {
    height: 60px;
    width: 60px;
    border: 3px solid #b7c4cf;
    border-radius: 50px;
    background-color: #b7c4cf;
    position: absolute;
    bottom: 20px;
    right: 20px;

    &:hover {
      background-color: #d7c0ae;
      border: 3px solid #d7c0ae;
    }
  }

  .task {
    &__list {
      width: 80%;
      padding: 0;
      overflow-y: scroll;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      margin: 10px auto;
      padding: 0 10px;
      border: 3px solid #d7c0ae;
      border-radius: 10px;
      background-color: #d7c0ae;

      &:first-child {
        border: 3px solid #b7c4cf;
        background-color: #b7c4cf;
        font-weight: bold;
      }

      &__button {
        height: 40px;
        width: 40px;
        border: 3px solid #967e76;
        border-radius: 120px;
        background-color: #967e76;

        &:hover {
          background-color: #b7c4cf;
          border-color: #b7c4cf;
        }

        &:disabled {
          background-color: #d7c0ae;
          border-color: #d7c0ae;
        }
      }

      &__selector {
        text-align: center;
        width: 100px;
        height: 40px;
        border: 3px solid #b7c4cf;
        border-radius: 5px;
        border: 3px solid #967e76;

        &:hover {
          background-color: #b7c4cf;
        }
      }
    }
  }
</style>
