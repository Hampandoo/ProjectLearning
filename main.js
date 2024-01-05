import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './app/firebase'

import { vTheme } from './directives/vTheme'

import Modal from "./plugins/modal"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Modal)
app.directive('theme', vTheme)

app.mount('#app')
