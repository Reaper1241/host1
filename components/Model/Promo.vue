<script setup>
import  SvgBank  from '/components/Svg/Bank.vue';
import  SvgCredit  from '/components/Svg/Credit.vue';
import  SvgDiscount  from '/components/Svg/Discount.vue';
import  SvgWheel  from '/components/Svg/Wheel.vue';

const promoList = ref([
    {
        text: '21 банк на выбор',
        logo: SvgBank,
    },
    {
        text: 'автокредит от 4.9%',
        logo: SvgCredit,
    },
    {
        text: '-10% по госпрограмме',
        logo: SvgDiscount,
    },
    {
        text: 'в подарок зимняя резина',
        logo: SvgWheel,
    }
])

</script>



<template>
    <div class="promo" >
        <div class="promo__scroll">
            <div class="promo__item" v-for="item in promoList">
                <component :is="item.logo"></component>
                <p>
                    {{ item.text}}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .promo{
        padding-left: 10px;
        display: flex;
        border-radius: 8px;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
        @media screen and (max-width:1200px) {

            gap: 20px;
            overflow-x: scroll;
            width: 440px;
            margin-left: 10px;
        }
        @media screen and (max-width:1000px) {
            gap: 20px;
            width: 100%;
            margin: 0;
        }
        @media screen and (max-width:767px) {
            gap: 20px;
            width: 570px;
            overflow-x: scroll;
        }
        @media screen and (max-width:565px) {
            gap: 20px;
            width: 100%;
            overflow-x: scroll;
        }
        .promo__scroll{
            display: flex;
            justify-content: space-between;
            
        }

        svg{
            height: 20px;
            width: 20px;
            fill: var(--color-c);
        }

        .promo__item{
            max-width: 129px;
            font-size: 14px;
            margin-right: 5px ;
            padding: 10px 2px;
            text-align: center;
            transition: background 0.2s ease-in-out 0s;
            @media screen and (max-width:1200px) {
                width: 142px;
                max-width: 142px;
            }
            @media screen and (max-width:1000px) {
                width: 180px;
                max-width: 200px;
            }
            @media screen and (max-width:767px) {
                width: 272px ;
                max-width: 300px;
            }
            @media screen and (max-width:565px) {
                width: 200px ;
                max-width: 400px;
            }
        }
    }
</style>