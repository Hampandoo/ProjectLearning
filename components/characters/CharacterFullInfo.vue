<template>
  <div class="full-info-container">
    <div class="title">
      <div class="image-container">
        <img :src="character.image" alt="">
      </div>
      <h2 class="">{{ character.name }}</h2>
    </div>
    <p>Status: {{ character.status }}</p>
    <p>Species: {{ character.species }}</p>
    <p>Gender: {{ character.gender }}</p>
    <p>Origin: {{ character.origin.name }}</p>
    <p>Location: {{ character.location.name }}</p>
  </div>
</template>

<script setup>
defineProps({
  character: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.full-info-container {
  padding: 20px;
  color: var(--black);
  background-color: var(--gray-100);
  width: 280px;
  min-height: 450px;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.image-container {
  max-width: 220px;
  max-height: 220px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>