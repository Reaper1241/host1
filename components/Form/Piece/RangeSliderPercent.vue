<script setup>
import {apiNew } from "@/constants/";

const props = defineProps(['carPrice', 'disabled'])

const emits = defineEmits(['percentListOutput']);

let percentList = ref(10);
let currentStep = ref(5);
const max = ref(80);

watch(percentList, (newPercentList, oldPercentList) => {
    if (newPercentList == '5') {
        percentList.value = 0;
    }
})

let firstFee = computed(() => {
    return (props.carPrice * percentList.value) / 100
})

emits('percentListOutput', percentList.value)
watch(percentList, (newPercentList, oldPercentList) => {
    emits('percentListOutput', percentList.value)
})


</script>

<template>
    <div class="percent-block">
        <label class="credit__first" for=" credit-page--first">
            <p class="first__row">
                Первоначальный взнос 
                <!-- <span class="output-first">{{ makeSpaces(firstFee) }} руб. ({{ percentList}}%)</span> -->
            </p>
        </label>
        <div class="range-slider">
            <div class="range-slider__value">
                <div class="value__left">0 %</div>
                <div class="value__right">80 %</div>
            </div>


            <input class="range-slider__input timelist range-input" type="range" min="0" :max="max" id="range"
                list="timelist" :step="currentStep" v-model="percentList" @change="percentListOutput"
                :disabled="props.disabled"
                :style="{ background: `linear-gradient(to right, #D2122B ${percentList / max * 100}%, #D2122B ${percentList / max * 100}%)` }" />

            <datalist id="timelist" :class="{ 'disabled': props.disabled }">
                <option value="0" label="0"></option>
                <option value="" label=""></option>
                <option value="10" label="10"></option>
                <option value="15" label="15"></option>
                <option value="20" label="20"></option>
                <option value="25" label="25"></option>
                <option value="30" label="30"></option>
                <option value="35" label="35"></option>
                <option value="40" label="40"></option>
                <option value="45" label="45"></option>
                <option value="50" label="50"></option>
                <option value="55" label="55"></option>
                <option value="60" label="60"></option>
                <option value="65" label="65"></option>
                <option value="70" label="70"></option>
                <option value="75" label="75"></option>
                <option value="80" label="80"></option>
            </datalist>


        </div>
    </div>
</template>

<style scoped lang="scss">
.range-slider {
    display: flex;
    flex-direction: column;

    .range-slider__value {
        display: flex;
        justify-content: space-between;
        color: var(--main-black);
        margin-bottom: 15px;

        .value__left,
        .value__right {
            background-color: #EDEDED;
            padding: 5px 10px;
            border-radius: var(--border-radius);
        }
    }
}

.first__row,
.payment__row,
.range__time-block label {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    padding: 4px 0;
    font-weight:700;
    font-size: 16px;
    line-height: 16px;
    color: black;

    .output-first {
        font-weight: bold;
    }
}
.percent-block{
    margin-bottom: -25px;
}
</style>