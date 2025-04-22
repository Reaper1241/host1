<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()

let breadcrumbs = []
let pathArray = $route.path.split("/").splice(1).filter(element => element !== '');

for (let i = 0; i < pathArray.length; i++) {
    breadcrumbs.push({
        to: breadcrumbs[i - 1] ? breadcrumbs[i - 1].to + "/" + pathArray[i] : "/" + pathArray[i],
        label: pathArray[i].replaceAll('reviews', 'Отзывы')
            .replaceAll('goscredit', 'Госпрограммы')
            .replaceAll('credit', 'Автокредит')
            .replaceAll('contact', 'Контакты')
            .replaceAll('trade', 'Trade-in')
            .replaceAll('politics', 'Политика конфиденциальности')
            .replaceAll('success', 'Успешная заявка')
            .replaceAll('cars', 'Автомобили')
            .replaceAll('china', 'Китайские автомобили')
            .replaceAll('taxi', 'Такси')
            .replaceAll('services', 'Услуги')
            .replaceAll('redemption', 'Выкуп')
            .replaceAll('installment', 'Рассрочка')
            .replaceAll('thank', 'Успешная заявка')




    })
    
}
if ($route.path.includes('/cars/china')) {
    breadcrumbs.splice(0, 1);
}
function getCrumb() {
    if ($route.path.includes('cars')) {
        if ('car' in $route.params) {
            return {
                to: '/cars/' + $route.params.brand + '/' + $route.params.model,
                label: `Смотреть все ${toUppercaseFirst($route.params.brand)} ${toUppercaseFirst($route.params.model)}`
            }
        } else if ('model' in $route.params) {
            return {
                to: '/cars/' + $route.params.brand + '/',
                label: `Смотреть все ${toUppercaseFirst($route.params.brand)}`
            }
        } else if ('brand' in $route.params) {
            return {
                to: '/cars/',
                label: `Смотреть все новые авто`
            }
        } else {
            return {
                to: '/',
                label: 'Главная'
            }
        }
    } else if ($route.path.includes('cars-used')) {
        if ('car' in $route.params) {
            return {
                to: '/cars-used/' + $route.params.brand + '/' + $route.params.model + '/' + $route.params.generation,
                label: `Смотреть все ${toUppercaseFirst($route.params.brand)} ${toUppercaseFirst($route.params.model)}`
            }
        } else if ('generation' in $route.params) {
            return {
                to: '/cars-used/' + $route.params.brand + '/' + $route.params.model,
                label: `Смотреть все ${cleanUpTitle($route.params.brand, $route.params.model)}`
            }
        } else if ('model' in $route.params) {
            return {
                to: '/cars-used/' + $route.params.brand + '/',
                label: `Смотреть все ${toUppercaseFirst($route.params.brand)}`
            }
        } else if ('brand' in $route.params) {
            return {
                to: '/cars-used/',
                label: `Смотреть все бу авто`
            }
        } else {
            return {
                to: '/',
                label: 'Главная'
            }
        }
    }
}
</script>

<template>
    <section class="breadcrumbs"
        :class="{ hide: ('car' in $route.params || 'brand' in $route.params || 'model' in $route.params) }">
        <div class="container">
            <ul class="breadcrumbs__list">
                <li class="breadcrumbs__item">
                    <NuxtLink to="/">Главная</NuxtLink>
                </li>

                <li class="breadcrumbs__item" v-for="(crumb, index) in breadcrumbs" :key="index">
                    <NuxtLink :to="crumb.to">{{ decodeURI(toUppercaseFirst(crumb.label)).replaceAll('_', ' ') }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </section>

    <!-- <div class="container back__wrapper"
        :class="{ show: ('cars' in $route.params || 'brand' in $route.params || 'model' in $route.params) }"
        v-if="'cars' in $route.params || 'brand' in $route.params || 'model' in $route.params">
        <NuxtLink :to="getCrumb().to">
            <i class="fa-solid fa-chevron-left"></i>
            {{ getCrumb().label }}
        </NuxtLink>
    </div> -->
</template>

<style scoped lang="scss">
.breadcrumbs {
    padding: 20px 0;
    display: block;
    font-size: 14px;

    @media screen and (max-width:1000px) {
        padding: 10px 0;
    }

    .breadcrumbs__list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;

        .breadcrumbs__item {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            &:not(:last-child):after {
                content: '/';
                font-family: 'Font Awesome 6 Free';
                font-weight: 900;
                padding: 0 0 0 5px;
                font-size: 12px;
            }
        }


    }
}

// .breadcrumbs.hide {
//     @media screen and (max-width: 767px) {
//         display: none;
//     }
// }

.back__wrapper {
    display: none;
    padding: 15px;

    .back {
        padding: 10px 15px;
        border-radius: 10px;
        background: var(--dark-grey);
        color: white;

        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 10px;
    }
}

.back__wrapper.show {
    @media screen and (max-width: 767px) {
        display: flex;
    }
}
</style>