<script setup>

import { ref } from 'vue';
const menuList = ref([
    {
        name: 'Все авто',
        link: '/cars',
    },
    {
        name: 'Китайские авто',
        link: '/cars/china',
    },
    {
        name: 'Автокредит',
        link: '/credit',
    },
    {
        name: 'Trade-in',
        link: '/trade',
    },
    {
        name: 'Выкуп',
        link: '/redemption',
    },
    {
        name: 'Госпрограммы',
        link: '/goscredit',
    },
    {
        name: 'Рассрочка',
        link: '/installment',
    },
    {
        name: 'Услуги',
        link: '/services',
    },
    {
        name: 'Контакты',
        link: '/contact',
    },
])
</script>

<template>

    <ul class="navbar-list">
        <li class="navbar-item" v-for="item in menuList">
            <NuxtLink :to="item.link" class="navbar-link">{{ item.name }}</NuxtLink>
        </li>
    </ul>
    
</template>

<style scoped lang="scss">
.navbar-list{
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    -ms-flex-align: start;
    align-items: flex-start;
    gap: 20px;
    padding: 15px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

    @media screen and (max-width:1000px) {
        justify-content: center;
    }

    .navbar-item{
        text-transform: uppercase;

        .navbar-link{
            text-decoration: underline;
        }
    }
}
</style>