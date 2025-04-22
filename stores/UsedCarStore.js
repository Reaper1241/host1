import { defineStore } from 'pinia';

export const useUsedCarStore = defineStore("usedCarStore", () => {
    const car = ref([])
    const carData = computed(() => car.value)

    return { car, carData }
});