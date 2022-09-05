<template>
  <AppList>
    <AppListItem v-for="task in doneTasks" :key="task.id">
      <AppListItemText>{{ task.title }} </AppListItemText>
    </AppListItem>
  </AppList>
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

<style scoped lang="scss"></style>
