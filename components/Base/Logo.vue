<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
            <NuxtLink to="/" class="logo">
                <img src="/new_logo.svg" alt="logo">
            </NuxtLink>
            
    
</template>

<style lang="scss" scoped>
.logo {
    width: auto;
    padding: 10px 0;

    @media screen and (max-width: 570px) {
        padding: 5px 0 0 0;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;

        @media screen and (max-width: 768px) {
            max-width: 90%;
        }
        @media screen and (max-width: 570px) {
            max-width: 40%;
        }
    }
}


</style>