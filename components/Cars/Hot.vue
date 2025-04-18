<script setup>
import { apiNew } from '@/constants';


const cars = ref([]);
fetch(`${apiNew}filters/models?model_tag_id=2`)
    .then(res => res.json())
    .then(data => cars.value = data.models)
    
</script>

<template>
    <section class="section cars-hot">
        <div class="container">
            <div class="cars-hot__wrapper">
                <div class="cars-hot__header">
                    <BaseTitle :title="`Вас может заинтересовать`" />
                </div>
                <div class="cars-template">
                    <CarSmallNM1 v-for="model in cars" :key="model.id" :car="model" />
                </div>
              
            </div>
        </div> 
    </section>

</template>

<style lang="scss" scoped>
.car {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
//    border-radius: var(--border-small-radius);
    transition: 0.3s;
    position: relative;
    background: white;
    max-height: 600px;
    margin-bottom: 40px;

    @media (max-width: 767px) {
        padding: 10px;
    }

    &:hover {
        box-shadow: var(--box-shadow);
        transition: 0.3s;
    }

    .car__title {
        font-size: var(--big-size);
        font-weight: bold;
        line-height: normal;

        span {
            color: #8E8D92;
            font-weight: inherit;
        }
    }

    .car__more-link {
        padding: 15px;
        background: var(--main-color);
        border: 1px solid var(--main-color);
        color: white;
        text-align: center;
    //    border-radius: var(--border-small-radius);
        width: auto;
        transition: 0.3s;

        &:hover {
            background: transparent;
            transition: 0.3s;
            color: var(--main-color);
        }
    }

    .car__price {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 10px;

        .car__price-month {
            color: var(--green);
            font-size: var(--standart-size);
            border: 1px solid var(--green);
            padding: 5px;
        //    border-radius: var(--border-small-radius);

            @media screen and (max-width: 400px) {
                font-size: 12px;
            }
        }

        .car__price-current {
            font-size: var(--medium-size);
            line-height: normal;
            font-weight: 600;
            color: var(--main-color);
        }
    }

    .car__controls {
        width: 100%;
    }

    .car__content {
        margin-bottom: 10px;
    }

    .car__img {
        position: relative;
        width: 100%;
        border-radius: 15px;
        overflow: hidden;
        height: 150px;
        margin-bottom: 15px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

    }
}
.cars-hot{
    padding-bottom: 10px;
    
}

.cars-hot__header{
    margin-bottom: 20px;
}
</style>