<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();


</script>

<template>
    <section class="models-catalog section">
        <div class="container">
            <BaseTitle :title="`Каталог моделей ${$route.params.brand.toUpperCase()}:`" />

            <div class="cars-template">
                <CarSmallNM1 v-for="model in newStore.models" :key="model.id" :car="model" class="brand" />
            </div>
            <!-- <div class="models__list">
                <NuxtLink :to="`/cars/${model.url_brand}/${model.url_model}`" v-for="model in newStore.models">
                    {{ model.model }}
                </NuxtLink>
            </div> -->
        </div>
    </section>
</template>

<style lang="scss" scoped>

.container{
    @media screen and (max-width:767px){
        display: none;
    }
}
// .cars-template{
//     @media screen and (max-width:570px) {
//         display: none;
//     }
// }
// .models__list{
//     display: none;
//     @media screen and (max-width:570px) {
//         display: flex;
//         gap: 10px;
//         flex-wrap: wrap;
//         justify-content: space-between;
//     }

//     a{
//         width: 47%;
//         padding: 7px;
//         font-size: 18px;
//         font-weight: 500;
//         // box-shadow: 0 0 1px 0 #0000000a, 3px 1px 7px 0 #0d234340;
//         border: 1px solid #D7D7D7;

//     }
// }
.models-catalog{
    padding-bottom: 20px;
}
</style>