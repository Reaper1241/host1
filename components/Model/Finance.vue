<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
</script>

<template>
    <section class="model-finance section">
        <div class="container">
            <div class="model-finance__wrapper">
                <div class="model-finance__header section__header">
                    <BaseSectionTitle :title="`${cleanUpTitle($route.params.brand)} Finance`" />
                </div>
                <div class="model-finance__body">
                    <FormModel :model="newStore.model" :modification="currentMod" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>


.model-finance {
    // background: #FAFAFA;
    // border-top: 1px solid var(--border-color);
    // border-bottom: 1px solid var(--border-color);
    @media screen and (max-width:895px) {
        font-size: 14px;
    }
}
</style>