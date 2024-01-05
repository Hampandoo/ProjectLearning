import { ref } from 'vue'

function loadTheme() {
  return localStorage.getItem('theme') || 'light'
}

function saveTheme(theme) {
  localStorage.setItem('theme', theme)
}

const theme = ref(loadTheme())

const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    saveTheme(theme.value)
  }

  return {
    theme,
    toggleTheme
  }
}

export { useTheme }