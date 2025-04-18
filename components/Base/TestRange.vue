<script setup>
import { ref } from 'vue';
const progress = ref(0);
const max = ref(7);
</script>

<template>
    <div class="container">
        <div class="progress-bar-container">
            <input type="range" min="0" :max="max" id="range2" class="range-input" v-model="progress"
                :style="{ background: `linear-gradient(to right, #283844 ${progress / max * 100}%, #ccc ${progress / max * 100}%)` }" />
            {{ progress }}
        </div>
    </div>
</template>

<style scoped></style>