import { useTheme } from "@/composables/useTheme";

const vTheme = {
  mounted(el, binding, vnode) {
    if (binding.value) {
      el.dataset.theme = binding.value
    }
    else {
      const { theme } = useTheme()
      el.dataset.theme = theme.value
    }
  },
  beforeUpdate(el, binding, vnode, prevVnode) {
    if (binding.value) {
      el.dataset.theme = binding.value
    }
    else {
      const { theme } = useTheme()
      el.dataset.theme = theme.value
    }
  },
};

export { vTheme }
