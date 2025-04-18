<script setup>
import { apiNew } from '@/constants';

const tag_id = ref(5)
const cars = ref([]);
function changeCategory(){
    fetch(`${apiNew}filters/models?model_tag_id=${tag_id.value}`)
    .then(res => res.json())
    .then(data => cars.value = data.models)
}
fetch(`${apiNew}filters/models?model_tag_id=5,6,7,8`)
    .then(res => res.json())
    .then(data => cars.value = data.models)
    
</script>

<template>
    <section class="section cars-hot">
        <div class="container">
            <!-- <div class="title">
                <p>Выбрать категорию такси:</p>
            </div>
            <div class="taxi__categories">
                <div class="taxi__category" @click="tag_id=5; changeCategory()">
                    Эконом
                </div>
                <div class="taxi__category"  @click="tag_id=6; changeCategory()">
                    Комфорт
                </div>
                <div class="taxi__category"  @click="tag_id=7; changeCategory()">
                    Комфорт+
                </div>
                <div class="taxi__category"  @click="tag_id=8; changeCategory()">
                    Детский
                </div>
            </div> -->
            <div class="cars-hot__wrapper">
                <div class="cars-hot__header">
                    <BaseTitle :title="`Авто для такси`" />
                </div>
                <div class="cars-template">
                    <CarSmallNM2 v-for="model in cars" :key="model.id" :car="model" />
                </div>
                
            </div>
        </div> 
    </section>

</template>

<style lang="scss">
    .taxi__categories{
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @media screen and (max-width:570px) {
            grid-template-columns: repeat(2, 1fr);
        }
        .taxi__category{
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            margin: 5px;
            padding: 10px;
            border-radius: 10px;
            &:hover{
                background: #fec000;
            }
        }
    }
    .title{
        p{
            font-size: 26px;
            font-weight: 700;
        }
      
    }
.cars-hot__header{
    padding-bottom: 25px;
    padding-top: 5px;
}

.cars-template{
    padding-bottom: 45px;
}
</style>