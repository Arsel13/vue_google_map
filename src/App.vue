<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f4f5fa;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 32px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
