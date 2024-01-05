<template>
  <div class="theme-switcher" @click="toggleTheme">
    <span>Theme: {{ theme }}</span>
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-switcher {
  display: inline-flex;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  background-color: var(--primary);
  color: var(--light);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
}
</style>