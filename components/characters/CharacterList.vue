<template>
  <div class="cahracter-list">
    <h1>Character List</h1>
    <div>
      <ul class="list">
        <li v-for="character in characterList" class="list-item">
          <CharacterCard :character="character" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import CharacterCard from './CharacterCard.vue'

defineProps({
  characterList: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.cahracter-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.list-item {
  flex: 1 1 49%;
}
</style>