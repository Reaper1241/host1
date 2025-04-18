<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const activeMenu = ref(true)
// const currentModel = computed(() => newStore.model)


</script>


<template>
    <section class="menu">
        <div class="container">
            <div class="menu__list">
                <ul class="about-menu__list">
                    <li class="about-menu__item" :class="{ 'active': activeMenu == 1 }" @click="activeMenu = 1">
                        <p>Комплектации и цены</p>
                    </li>
                    <li class="about-menu__item" :class="{ 'active': activeMenu == 2}" @click="activeMenu = 2">
                        <p>Технические характеристики</p>
                    </li>
                    <li class="about-menu__item" :class="{ 'active': activeMenu == 3}" @click="activeMenu = 3">
                        <p>Фотогалерея</p>
                    </li>
                    <li class="about-menu__item" :class="{ 'active': activeMenu == 4}" @click="activeMenu = 4">
                        <p> Finance</p>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section class="model" :class="{ 'active': activeMenu == 1 }">
        <ModelComplectations/>
    </section>
    <section class="model" :class="{ 'active': activeMenu == 2 }">
        <ModelModificationValues/>
    </section>
    <section class="model sections-foto" :class="{ 'active': activeMenu == 3 }">
        <ModelSlider :images="newStore.model.galleries"/>
    </section>
    <section class="model  active">
        <ModelFinance/>
    </section>

</template>

<style lang="scss">
.menu{
    background-color: #f4f4f4;
}
.about-menu__list {
    margin-bottom: 50px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: baseline;
    align-items: baseline;
    column-gap: 10px;
    

    @media screen and (max-width:767px) {
        display: block;
    }

    .about-menu__item {
        text-align: center;
        padding: 15px 15px;
        cursor: pointer;
        position: relative;
        transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        font-weight: 400;
        color: rgb(199, 199, 199);
        box-shadow: 4px 0 6px -2px rgba(0, 0, 0, 0.05); // ✅ тень только справа
        
    }
    .about-menu__item.active {
        color: black;
    }
}

.model{
    display: none;
}
.model.active{
    display: block;
}
.sections-foto.active {
    max-width: 1200px;
    margin: 0 auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-line-pack: center;
  align-content: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>