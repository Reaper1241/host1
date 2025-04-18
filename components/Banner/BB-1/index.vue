<script setup>
const benefits = [
    {
        id: 2,
        icon: 'fa fa-shield',
        title: 'Гарантия',
        text: '18 банков и 96% одобрения',
    },
    {
        id: 3,
        icon: 'fa fa-file',
        title: 'Простое оформление',
        text: 'Оформление по 2 документам',
    },
    {
        id: 4,
        icon: 'fa fa-ruble-sign',
        title: 'Финансовые возможности',
        text: 'Без первоначального взноса',
    },
    {
        id: 5,
        icon: 'fa fa-chart-pie',
        title: 'Доступность',
        text: 'Мин. ставка от 3,5%',
    },
    {
        id: 1,
        icon: 'fa fa-clock',
        title: 'Скорость',
        text: 'Решение за 30 мин',
    },
]
</script>

<template>
    <section class="benefits section">
        <div class="container">
            <div class="benefits__header">
            </div>
            <div class="benefits__body">
                <div class="benefits__benefits">
                    <div class="benefits__benefit" v-for="benefit in benefits" :key="benefit.id">
                        <div class="benefits__benefit-icon">
                            <i :class="benefit.icon"></i>
                        </div>
                        <div>
                            <div class="benefits__benefit-title">
                                {{ benefit.title }}
                            </div>
                            <div class="benefits__benefit-text">
                                {{ benefit.text }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.benefits__benefits {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
        overflow: auto;
        flex-wrap: nowrap;
        padding-bottom: 10px;
    }

    .benefits__benefit {
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 10px;
    //    border-radius: var(--border-small-radius);
        cursor: pointer;

        &:hover {
            box-shadow: var(--box-shadow);
            transition: 0.3s;
        }

        @media screen and (max-width: 768px) {
            min-width: max-content;
        }

        .benefits__benefit-title {
            font-weight: 600;
            margin-bottom: 5px;

            @media screen and (max-width: 768px) {
                font-size: var(--standart-size);
            }
        }

        .benefits__benefit-text {
            @media screen and (max-width: 768px) {
                font-size: var(--standart-size);
            }
        }

        .benefits__benefit-icon {
            i {
                font-size: 30px;
                color: var(--green);
            }
        }
    }
}
</style>