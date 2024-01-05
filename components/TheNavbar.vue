<template>
  <div class="nav-wrapper">
    <div class="">
      <span class="Title">Project-A</span>
    </div>
    <ThemeSwitcher />
    <button class="button-out" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
import { AuthService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
import ThemeSwitcher from './ThemeSwitcher.vue';

const $router = useRouter()

function signOut() {
  AuthService.signOut().then(() => {
    $router.push({ name: 'sign-in' })
  })
}
</script>

<style scoped>
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Title {
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: 1rem;
  margin-right: 1rem;
}

.button-out {
  background-color: inherit;
  border: none;
  color: var(--white);
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>