<template>
  <div id="title">
    <div id="subroute-button-group">
      <AppLink name="daily-task-todo"><button>To Do</button></AppLink>
      <AppLink name="daily-task-doing"><button>Doing</button></AppLink>
      <AppLink name="daily-task-done"><button>Done</button></AppLink>
    </div>
    <button @click="handleOnClick">Get</button>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppLink from '@/components/AppLink.vue';
  import { getTasks } from '@/services/api';

  const handleOnClick = async () => {
    const data = await getTasks();
    console.log(data);
  };
</script>

<style scoped>
  #title {
    text-align: center;
  }

  ul {
    list-style-type: none;
  }
</style>
