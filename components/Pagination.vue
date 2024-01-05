<template>
  <div class="pagination">
    <span v-for="pageNumber in displayedPages" :key="pageNumber">
      <button 
        :disabled="pageNumber === '...'"
        @click="paginate(pageNumber)" 
        :class="{ active: pageNumber === modelValue }"
        class="btn"
      >
      {{ pageNumber }}
    </button>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const $props = defineProps({
  maxPage: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
})

const $emit = defineEmits(['update:modelValue'])

const displayedPages = computed(() => {
  const pages = []
  
  for(let i = 1; i <= $props.maxPage; i++) {
    if (i === 1 || i === $props.maxPage || Math.abs(i - $props.modelValue) <= 1) {
      pages.push(i)
    }
  }
  if (pages[1] - pages[0] > 1) {
    pages.splice(1, 0, '...')
  }
  if (pages[pages.length - 1] - pages[pages.length - 2] > 1) {
    pages.splice(pages.length - 1, 0, '...')
  }

  return pages
})

function paginate(pageNumber) {
  $emit('update:modelValue', pageNumber)
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 5px;
}


.btn {
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  background-color: var(--secondary);
  color: var(--black);
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  background-color: var(--gray-300);
  color: var(--secondary)
}

.btn.active {
  font-weight: bold;
  background-color: var(--primary);
  color: var(--white);
}
</style>
