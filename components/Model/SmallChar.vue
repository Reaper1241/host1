<script setup>

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import  SvgEngine  from '/components/Svg/Engine.vue';
import  SvgClock  from '/components/Svg/Clock.vue';
import  SvgSpeedometer  from '/components/Svg/Speedometer.vue';
import  SvgPetrolFuel  from '/components/Svg/PetrolFuel.vue';



const attrs = [
    {
        img: SvgEngine,
        title:'Мощность',
        text:newStore.model.modifications[0].power+ ' л.с.'
    },
    {
        img: SvgClock,
        title:'Разгон',
        text:newStore.model.modifications[0].from_0_to_100+ ' сек.'
    },
    {
        img: SvgSpeedometer,
        title:'Скорость',
        text:newStore.model.modifications[0].max_speed+ ' км/ч'
    },
    {
        img: SvgPetrolFuel,
        title:'Расход',
        text:newStore.model.modifications[0].consumption_combine+ ' л/100км'

    },
]

</script>

<template>
    <div class="model-attr__wrapper">
        <div class="model-attr" v-for="attr in attrs" :key="attr.title">
            <component :is="attr.img" />
            <p>{{ attr.title }}</p>
            <p>{{ attr.text }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.model-attr__wrapper{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
        align-items: center;
    }
    @media screen and (max-width: 380px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
}
.model-attr {
  flex: 1 1 22%;
  text-align: center;
  font-size: 14px;
  padding: 10px;

  svg {
    margin: 0 auto 5px;
    width: 40px;
    height: 40px;
    fill: #a5a5a5;
  }

  p {
    margin: 4px 0;
  }
}


</style>