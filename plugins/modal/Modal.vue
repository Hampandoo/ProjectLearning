<script setup>
import { inject, computed } from "vue"

const $props = defineProps({
    name: { type: String, default: "" }
})

const $modals = inject("$modals")

const isVisible = computed(() => {
    return $modals.active() == $props.name
})

function closeModal() {
    $modals.close()
}
</script>

<template>
    <div class="modal-container" v-if="isVisible" @click="closeModal()">
        <div class="dialog-container">
            <main @click.stop class="dialog-main">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<style scoped>
.modal-container {
    --shadow: rgba(0, 0, 0, 0.4);
    display: flex;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: var(--shadow);
    justify-content: center;
    align-items: center;
}

.dialog-container {
    border: 1px solid var(--gray-100);
    border-radius: 0.5rem;
    box-shadow: 0 1rem 1rem var(--shadow);
    background-color: var(--gray-300);
    color: var(--gray-100);
}

.dialog-main {
    min-height: 5rem;
    max-width: 40rem;
}
</style>