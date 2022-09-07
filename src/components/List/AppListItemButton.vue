<template>
  <button></button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  button {
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
</style>
