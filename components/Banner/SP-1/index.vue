<script setup>
import  SvgFamily  from '/components/Svg/Family.vue';
import  SvgMedal  from '/components/Svg/Medal.vue';
import  SvgSwap  from '/components/Svg/Swap.vue';
import  SvgPercentIcon  from '/components/Svg/PercentIcon.vue';



const items = ref([
    {
        id: 1,
        title: `Семейный автомобиль`,
        image: SvgFamily,
        link: `/credit`
    },
    {
        id: 2,
        title: `Первый автомобиль`,
        image: SvgMedal,
        link: `/credit`

    },
    {
        id: 3,
        title: `Выгодный Trade-In`,
        image: SvgSwap,
        link: `/trade`

    },
    {
        id: 4,
        title: `Ставки по кредитам от 4.9%`,
        image: SvgPercentIcon,
        link: `/credit`

    },
    
])
</script>

<template>

<ClientOnly>

    <section class="banner-sp1 section">
        <div class="container">
            <div class="sp1__wrapper">
                <div class="sp1__header">
                    <BaseTitle :title="`Специальные программы`" />
                </div>

                <div class="sp1__body">
                    <div class="sp1__items">
                        <ClientOnly>
                            <BannerSP1Item  :item="items" />
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
</ClientOnly>
</template>

<style lang="scss" scoped>
// .sp1__items {
//     display: grid;
//     grid-template-columns: repeat(6, 1fr);
//     gap: 10px;

//     @media screen and (max-width: 1400px) {
//         grid-template-columns: repeat(3, 1fr);
//     }

//     @media screen and (max-width: 800px) {
//         display: flex;
//         overflow: scroll;
//         flex-wrap: nowrap;
//         padding-bottom: 10px;
//     }
// }
.banner-sp1{
    margin-bottom: 20px;
}
.sp1__header{
    @media screen and (max-width:570px) {
        display: none;

    }
}
</style>