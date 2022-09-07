<template>
  <RouterLink :to="props"><slot></slot></RouterLink>
</template>

<script setup lang="ts">
  import { RouterLink, type RouteParams } from 'vue-router';
  import type { AppRouteNames } from '@/router/router';

  export interface AppLinkProps {
    name: AppRouteNames;
    params?: Partial<RouteParams>;
  }
  const props = withDefaults(defineProps<AppLinkProps>(), {
    params: () => ({}),
  });
</script>

<style scoped></style>
