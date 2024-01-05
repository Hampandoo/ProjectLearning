<template>
  <component :is="layout" :data-theme="theme">
    <RouterView />
  </component>
</template>

<script setup>
import { useLayout } from '@/composables/useLayout';
import { useTheme } from './composables/useTheme';

const { layout } = useLayout();
const { theme } = useTheme();
</script>

<style scoped>
</style>
