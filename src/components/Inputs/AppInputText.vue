<template>
  <input
    type="text"
    v-modle="text"
    @keyup.enter="
      (e) => {
        onSubmit(e);
        text = '';
      }
    "
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const text = ref('');

  const props = defineProps<{
    placeholder: string;
    onSubmit: (e: Event) => void;
  }>();
</script>

<style scoped lang="scss"></style>
