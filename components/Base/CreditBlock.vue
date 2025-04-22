<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const props = defineProps({
    car: {
        type: Object,
        default: {}
    },
    id: {
        type: String,
        default: ''
    }
})

let carPrice = ref();
carPrice.value = props.car.sale ? props.car.price - props.car.sale : props.car.price

/* Time List */
let timeListOutputData = ref(0);
let carInitialFee = ref(0);


function percentListOutput(value) {
    carInitialFee.value = value
}

function timeListOutput(value) {
    if (value == 0) {
        timeListOutputData.value = 0.5 * 12
    } else {
        timeListOutputData.value = value * 12
    }
}

let monthlyPayment = computed(() => {
    let i = (appStore.creditPercent / 12) / 100;
    let k = ((carPrice.value) - ((carPrice.value * carInitialFee.value) / 100));
    let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
    let numb = (k * num);

    return Math.floor(numb)
})
/* Time List */
</script>

<template>
    <ClientOnly>
        <div class="credit-data" :id="id">
            <BaseRangeTime @timeListOutput="timeListOutput" />
            <BaseRangePercent :min="0" :max="80" :step="5" :carPrice="car.price - car.sale"
                @percentListOutput="percentListOutput" />
            <div class="form__credit-data">
                <div class="credit-data__item">
                    <div class="credit-data__title">Ставка от </div>
                    <div class="credit-data__value">
                        <span>{{ appStore.creditPercent }}%</span>
                    </div>
                </div>
                <div class="credit-data__item">
                    <div class="credit-data__title">Платеж от</div>
                    <div class="credit-data__value"><span>{{ makeSpaces(monthlyPayment) }}₽</span>/мес.</div>
                </div>
                <div class="credit-data__item car-price">
                    <div class="credit-data__title">Стоимость авто от</div>
                    <div class="credit-data__value"><span>{{ makeSpaces(car.price - car?.sale) }}₽</span></div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="scss" scoped>
.form__credit-data {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    gap: 30px;

    width: 100%;
    // padding: 30px 0;
    padding: 0;
    border-radius: var(--border-radius);
    background: white;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 15px 0;
    }

    @media screen and (max-width: 540px) {
        align-items: start;
        gap: 15px;
    }

    @media screen and (max-width: 340px) {
        flex-direction: column;
    }

    .credit-data__item {
        text-align: start;
        font-weight: bold;
        border: 1px solid var(--main-color);
        text-align: center;
        padding: 15px 25px;
    //    border-radius: var(--border-small-radius);
        display: flex;
        align-items: center;
        gap: 50px;

        @media screen and (max-width: 768px) {
            justify-content: space-between;
            gap: 0;
        }

        .credit-data__title {
            padding-top: 7px;

            @media screen and (max-width:350px) {
                font-size: var(--standart-size);
            }
        }

        span {
            font-size: 25px;
            font-weight: bold;
            color: var(--black);
        }
    }

    .credit-data__item.car-price {
        display: none;
    }
}

.credit-data {

    margin: 0; // margin: 30px 0;

    @media screen and (max-width: 768px) {
        margin: 15px 0;
    }
}
</style>