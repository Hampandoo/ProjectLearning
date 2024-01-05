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
      placeholder="Password"
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
    <input
      v-model.trim="credentials.confirmPassword"
      type="password"
      placeholder="Confirm password"
      class="input-field"
      :class="{ 'error': !validation.confirmPassword.status }" 
      @blur="validateOneField('confirmPassword')"
    />
    <div
      class="error-message"
      v-if="!validation.confirmPassword.status"
    >
      {{ validation.confirmPassword.message }}
    </div>
    <div class="text-end" v-if="!isSubmitted">
      <button type="submit" class="submit-button">Sign Up</button>
    </div>
    <div v-else type="submit" class="success-button">Success!</div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { validateEmail, validatePassword, validateConfirmPassword } from '@/utils/validators.js'
import { useRoute } from 'vue-router';

const $emit = defineEmits(['submit']);

const $route = useRoute()

const isSubmitted = computed(() => {
  return $route.query.registered
})

// Ці реактивні змінні містять у собі значення інпут полів форми
const credentials = ref({
  email: "",
  password: "",
  confirmPassword: "",
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
  confirmPassword: {
    status: true,
    message: "Password doesn't match",
    validator: validateConfirmPassword,
    // dependsOn - поле, від якого залежить валідація даного поля. Якщо воно не валідне, то дане поле не валідується
    dependsOn: "password"
  },
})

// Функція для встановлення помилки для поля. Якщо передається false, то помилка є, якщо true - то її немає
const setError = (field, status) => {
  validation.value[field].status = status
}

// Функція що валідує певне поле. Приймає ім'я поля та викликає валідатор для нього. Встановлює чи є помилка для поля
function validateOneField(field) {
  // Перевіряємо чи є поле, від якого залежить дане поле. 
  // Якщо так - кладемо у валідатор два значення, своє та поля від якого залежить дане поле
  if (validation.value[field].dependsOn) {
    let dependsOn = validation.value[field].dependsOn

    setError(
      field,
      validation.value[field]
        .validator(credentials.value[field], credentials.value[dependsOn])
    )
  } else {
    // В іншому випадку кладемо тільки значення даного поля
    setError(field, validation.value[field].validator(credentials.value[field]))
  }
}

// Функція для валідації всіх полів. Перебирає всі поля валідації і викликає для них валідатори. 
// Повертає true, якщо всі поля валідні
function validateAll() {
  for (const field in validation.value) {
    validateOneField(field)
  }

  const keys = Object.keys(validation.value)
  const isValid = keys.every(key => validation.value[key].status)

  return isValid
}

function onSubmit() {
  // Якщо хоч одне поле не валідне, форма не відправляється
  if (!validateAll()) return

  // Відправляємо дані форми, але без confirmPassword. Це поле потрібно тільки для валідації
  $emit('submit', {
    email: credentials.value.email,
    password: credentials.value.password
  })
}
</script>


<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--gray-100);
  background: var(--gray-300);
  margin-top: 10px;
}

.submit-button {
  background-color: var(--secondary);
  color: var(--white);
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
.success-button {
  background-color: var(--success);
  color: var(--white);
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;

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