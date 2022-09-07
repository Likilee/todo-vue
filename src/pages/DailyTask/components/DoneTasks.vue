<template>
  <div class="container">
    <AppList>
      <AppListItem v-for="task in doneTasks" :key="task.id">
        <AppListItemText>{{ task.title }} </AppListItemText>
      </AppListItem>
    </AppList>
  </div>
</template>

<script setup lang="ts">
  import AppList from '@/components/List/AppList.vue';
  import AppListItem from '@/components/List/AppListItem.vue';
  import type { Task } from '@/services/model';
  import AppListItemText from '../../../components/List/AppListItemText.vue';

  const props = defineProps<{
    doneTasks: Task[];
  }>();
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
</style>
