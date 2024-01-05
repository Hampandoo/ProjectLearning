<template>
  <div class="auth-page">
    <div class="text-between">
      <h1 class="page-title">Sign Up</h1>
      <RouterLink :to="{ name: 'sign-in' }">
        <span class="link">Back to Login?</span>
      </RouterLink>
    </div>
    <FormSignUp @submit="onSubmit" />
  </div>
</template>

<script setup>
import FormSignUp from '@/components/auth/FormSignUp.vue'
import { AuthService } from '@/services/auth.service.js'
import { useRouter } from 'vue-router'

const $router = useRouter()

function onSubmit(credentials) {
  AuthService
    .signUp(credentials)
      .then(() => {
        $router.push({ query: { registered: true } })
      })
      .then(() => {
        setTimeout(() => {
          $router.push({ name: 'sign-in' })
        }, 1000)
      })
}
</script>

<style scoped>
.auth-page {
  background-color: var(--light);
  margin: 0 auto;
  width: 400px;
  padding: 20px 60px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--secondary);
}
.text-between {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
</style>