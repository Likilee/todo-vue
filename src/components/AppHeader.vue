<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup lang="ts">
  export interface AppHeaderProps {
    title: string;
  }
  const props = defineProps<AppHeaderProps>();
</script>

<style scoped>
  h1 {
    text-align: center;
  }

  header {
    padding: 10px;
    background-color: aliceblue;
  }
</style>
