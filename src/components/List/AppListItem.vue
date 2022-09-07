<template>
  <li>
    <slot>Empty List Item</slot>
  </li>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    margin: 10px auto;
    padding: 0 10px;
    border: 3px solid #d7c0ae;
    border-radius: 10px;
    background-color: #d7c0ae;
  }
</style>
