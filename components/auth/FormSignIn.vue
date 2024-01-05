<template>
  <form @submit.prevent="onSubmit">
    <input 
      v-model.trim="credentials.email"
      placeholder="Email"
      class="input-field"
      :class="{ 'error': !validation.email.status }"
      @blur="validateOneField('email')"
    />
    <div
      v-if="!validation.email.status"
      class="error-message"
    >
      {{ validation.email.message }}
    </div>
    <input
      v-model.trim="credentials.password"
      type="password"
      placeholder="********"
      class="input-field"
      :class="{ 'error': !validation.password.status }" 
      @blur="validateOneField('password')"
    />
    <div
      class="error-message"
      v-if="!validation.password.status"
    >
      {{ validation.password.message }}
    </div>
    <div class="text-end">
      <button type="submit" class="submit-button">Sign In</button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { validateEmail, validatePassword } from '@/utils/validators.js'

const $emit = defineEmits(['submit']);

// Ці реактивні змінні містять у собі значення інпут полів форми
const credentials = ref({
  email: "",
  password: "",
})

// Ця реактивна змінна містить у собі об'єкт з опціями валідації та помилками для кожного поля
const validation = ref({
  // Імена полів повинні співпадати з іменами полів в credentials
  email: {
    // Статус відображає чи поле валідооване. По дефолту стоїть - true, щоб помилки не відображались.
    status: true,
    // Message - повідомлення про помилку, яке відображаєтсья у шаблоні
    message: "Email is incorrect",
    // Validator - функція, яка валідує поле. Повертає true, якщо поле валідне, і false, якщо ні.
    validator: validateEmail
  },
  password: {
    status: true,
    message: "Password must be at least 8 characters long",
    validator: validatePassword
  },
})

// Функція для встановлення помилки для поля. Якщо передається false, то помилка є, якщо true - то її немає
const setError = (field, status) => {
  validation.value[field].status = status
}

// Функція що валідує певне поле. Приймає ім'я поля та викликає валідатор для нього. Встановлює чи є помилка для поля
function validateOneField(field) {
  setError(field, validation.value[field].validator(credentials.value[field]))
}

// Функція для валідації всіх полів. Перебирає всі поля валідації і викликає для них валідатори. 
// Повертає true, якщо всі поля валідні
function validateAll() {
  for (const field in validation.value) {
    validateOneField(field)
  }
}

const isFormValid = computed(() => {
  // Перевіряємо чи всі поля валідні.
  const keys = Object.keys(validation.value)
  // Якщо хоч одне поле не валідне, то isValid буде false
  const isValid = keys.every(key => validation.value[key].status)

  return isValid
})

function onSubmit() {
  validateAll()
  // Якщо хоч одне поле не валідне, форма не відправляється
  if (!isFormValid) return

  $emit('submit', credentials.value)
}
</script>


<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--gray-300);
  background: var(--gray-100);
  margin-top: 10px;
}

.submit-button {
  background-color: var(--primary);
  color: var(--white);
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
.text-end {
  text-align: end;
}
.error-message {
  color: var(--danger);
  font-size: 12px;
}
.error {
  border-color: var(--danger);
}
</style>