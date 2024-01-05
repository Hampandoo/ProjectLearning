<template>
  <div class="filter-panel">
    <h2 class="title">Filter</h2>
    <input v-model.trim="filter.name" placeholder="Name" type="text">
    <input v-model.trim="filter.species" placeholder="Species" type="text">
    <select v-model="filter.status">
      <option value=""></option>
      <option v-for="(item, index) in status" :key="item + index" :value="item">{{ item }}</option>
    </select>
    <select v-model="filter.gender">
      <option value=""></option>
      <option v-for="(item, index) in gender" :key="item + index" :value="item">{{ item }}</option>
    </select>
    <button @click="applyFilter" class="btn">Apply</button>
    <button @click="resetFilter" class="btn">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const $emit = defineEmits(['filter'])

const status = ['alive', 'dead', 'unknown']
const gender = ['male', 'female', 'genderless', 'unknown']

const filter = ref({
  name: '',
  species: '',
  status: '',
  gender: ''
})

function getNotEmptyFields() {
  const obj = {}
  Object.keys(filter.value).map((key) => {
    if (filter.value[key] !== '') {
      obj[key] = filter.value[key]
    }
  })
  return obj
}

function resetFilter() {
  filter.value = {
    name: '',
    species: '',
    status: '',
    gender: ''
  }
  $emit('filter', getNotEmptyFields())
}
function applyFilter() {
  $emit('filter', getNotEmptyFields())
}

</script>

<style scoped>
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--white);
  border-radius: 5px;
  background-color: var(--gray-200);
  color: var(--light)
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: var(--white);
}

.btn {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid var(--light);
  background-color: var(--secondary);
  color: var(--black);
  cursor: pointer;
}
</style>
