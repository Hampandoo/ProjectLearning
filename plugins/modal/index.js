import { ref } from "vue";
import Modal from "./Modal.vue";

const current = ref({
  name: "",
  resolve: null,
  reject: null
})

const API = {
  active() {
    return current.value.name
  },
  open(name) {
    current.value.name = name
  },
  close() {
    current.value.name = ""
  }
}

const plugin = {
  install(App) {
    App.component("Modal", Modal)

    App.provide("$modals", API)
  },
}

export default plugin
