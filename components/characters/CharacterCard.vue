<template>
  <div class="info-container">
    <div class="img-container">
      <img :src="character.image" alt="">
    </div>
    <div class="info">
      <h3 class="name">{{ character.name }}</h3>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
      <div class="more-info">
        <p>Gender: {{ character.gender }}</p>
        <button class="info-btn" @click="showModal">
          ?
        </button>
      </div>
    </div>
    <Modal :name="modalName">
      <CharacterFullInfo :character="character" />
    </Modal>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import CharacterFullInfo from './CharacterFullInfo.vue'

const $props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const $modals = inject('$modals')

function showModal() {
  $modals.open(modalName.value)
}

const modalName = computed(() => {
  return `character-info-${$props.character.id}`
})
</script>

<style scoped>
.info-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--black);
  border-radius: 5px;
  background-color: var(--gray-200);
}

.img-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  color: var(--white);
}

.name {
  font-size: 1rem;
  font-weight: bold;
}

.more-info {
  display: flex;
  justify-content: space-between;
}

.info-btn {
  padding: 2px 10px;
  border: 1px solid var(--gray-100);
  border-radius: 5px;
  background-color: var(--black);
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.info-btn:hover {
  background-color: var(--white);
  color: var(--black);
}
</style>