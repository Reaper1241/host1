<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const model = newStore.model

const appType = 2

const isOpen = ref(false)

console.log(model);

function modalShow() {
  isOpen.value = !isOpen.value
  appStore.modalShown = !appStore.modalShown
}

const car = computed(() => {
  const test = {
    brand: model.brand,
    model: model.model,
    price: model.modifications[0].car_complectations[0].price,
    min_price: model.min_price,
    sale: model.sale,
    images: model.galleries
  }

  return test
})

</script>

<template>
  <div class="button" @click="modalShow(), car ? yandexEcommerce('add', car) : null">
    <p>Рассчитать кредит </p>
  </div>
  <Teleport to="body">
    <div v-if="isOpen">
      <BaseModalNew :modalTitle="modalTitle" :appType="appType" :car="car" @closeModal="modalShow()" class="taxi" />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>

</style>