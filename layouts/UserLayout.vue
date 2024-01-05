<template>
  <div class="user-layout">
    <TheNavbar class="navbar" />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
</script>

<style>
.user-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--gray-100);
  padding-top: 80px;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--secondary-light);
  padding: 10px;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>