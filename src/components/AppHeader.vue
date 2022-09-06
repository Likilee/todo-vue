<template>
  <header>
    <h2>{{ title }}</h2>
  </header>
</template>

<script setup lang="ts">
  export interface AppHeaderProps {
    title: string;
  }
  const props = defineProps<AppHeaderProps>();
</script>

<style scoped>
  h2 {
    text-align: center;
    margin: auto;
  }

  header {
    display: flex;
    height: 60px;
  }
</style>
