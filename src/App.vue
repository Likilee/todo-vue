<template>
  <AppHeader title="Priority Tasks" />
  <RouterView />
  <AppFooter />
</template>

<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import { RouterView } from 'vue-router';
</script>

❓ Base 스타일 적용을 위해 루트 컴포넌트의 style 태그의 scope 속성을1111
<style lang="scss">
  html {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }
</style>
