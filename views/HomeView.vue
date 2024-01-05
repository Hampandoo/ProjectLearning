
<template>
  <div class="home-view">
    <div class="filter-section">
      <FilterPanel @filter="applyFilter" />
    </div>
    <div class="main-content">
      <div class="product-list-section">
        <BaseLoader v-if="isLoading" />
        <CharacterList v-else-if="characterList.length > 0" :characterList="characterList" />
        <div v-else class="empty-list">No results found</div>
      </div>
      <div class="pagination-section">
        <Pagination v-model="currentPage" :max-page="maxPages" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ApiService } from '@/services/api.service'
import FilterPanel from '@/components/FilterPanel.vue'
import Pagination from '@/components/Pagination.vue'
import CharacterList from '@/components/characters/CharacterList.vue'
import BaseLoader from '@/components/BaseLoader.vue'

const currentPage = ref(1)
const maxPages = ref(1)
const fitler = ref({})

const characterList = ref([])

const $router = useRouter()

const isLoading = ref(false)

function loadCharacterList() {
  isLoading.value = true

  ApiService.getCharacters(
    {
      ...fitler.value,
      page: currentPage.value
    }
  )
    .then(({ data }) => {
      maxPages.value = data.info.pages
      characterList.value = data.results
    })
    .catch((error) => {
      if (error.response.status === 404) {
        characterList.value = []
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}

watchEffect(async () => {
  $router.push({ query: { page: currentPage.value, ...fitler.value } })
})
onBeforeRouteUpdate((to, from) => {
  loadCharacterList()
})
onMounted(() => {
  loadCharacterList()
})

function applyFilter(data) {
  currentPage.value = 1
  fitler.value = data
}
</script>

<style scoped>
.home-view {
  display: flex;
  width: 100vw;
  grid-gap: 25px;
}

.filter-section {
  padding: 10px;
  margin-bottom: 20px;
}

.main-content {
  flex: 1;
  width: 100%;
  padding: 10px 20px;
}

.product-list-section {
  background-color: var(--white);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px var(--gray-300);
  height: calc(100vh - 200px);
  width: 100%;
}

.pagination-section {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.empty-list {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--gray-200);
}
</style>
