<template>
  <main class="auth-layout">
    <div class="auth-content">
      <ThemeSwitcher />
      <slot />
    </div>
  </main>
</template>

<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
</script>

<style scoped>
.auth-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-100);
}

.auth-content {
  padding: 20px;
  border-radius: 5px;
  background-color: var(--light);
}
</style>