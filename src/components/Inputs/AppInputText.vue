<template>
  <input
    type="text"
    v-model="text"
    @change="
      (e) => {
        addTask(e);
        text = '';
      }
    "
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const text = ref('');
  const props = defineProps<{
    addTask: (e: Event) => void;
  }>();
</script>

<style lang="scss"></style>
