<template>
  <div class="auth-page">
    <div class="text-between">
      <h1 class="page-title" >Sign In</h1>
      <RouterLink :to="{ name: 'sign-up' }">
        <span class="link">Create new account?</span>
      </RouterLink>
    </div>
    <FormSignIn @submit="onSubmit" />
  </div>
</template>

<script setup>
import { AuthService } from '@/services/auth.service.js'
import { useRouter } from 'vue-router'
import FormSignIn from '@/components/auth/FormSignIn.vue'
import { useUserStore } from '@/stores/user'

const $router = useRouter()

const userStore = useUserStore()

function onSubmit(credentials) {
  AuthService.signIn(credentials)
    .then((resp) => {
      userStore.setUser(resp.user.email)

      $router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err)
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
  color: var(--primary);
  text-align: start;
}
.text-between {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
</style>