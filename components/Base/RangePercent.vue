<script setup>
const props = defineProps({
    carPrice: {
        type: Number,
        default: 0,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 80,
    },
    step: {
        type: Number,
        default: 0,
    },
    class: {
        type: String,
        default: '',
    }
})

const emits = defineEmits(['percentListOutput']);

const range = computed(() => {
    const list = [];
    for (let i = props.min; i <= props.max; i += props.step) {
        list.push(i);
    }
    return list;
})

const percentList = ref(10);

watch(percentList, (newPercentList) => {
    if (newPercentList == '5') {
        percentList.value = 0;
    }
})

const firstFee = computed(() => {
    return (props.carPrice * percentList.value) / 100
})

emits('percentListOutput', percentList.value)
watch(percentList, (newPercentList, oldPercentList) => {
    emits('percentListOutput', percentList.value)
})
</script>



<template>
    <div class="percent-block" :class="class">
        <label class="credit__first" for=" credit-page--first">
            <p class="first__row">
                Первоначальный взнос   
                <!-- <span class="output-first">{{ makeSpaces(firstFee) }} руб.</span> -->
            </p>
        </label>
        <div class="range-slider">
            <div class="range-slider__value">
                <div class="value__left">{{ min }} %</div>
                <div class="value__right">{{ max }} %</div>
            </div>

            <input class="range-slider__input timelist range-slider__progress range-input" type="range" :min="min"
                :max="max" list="timelist" :step="step" v-model="percentList" @change="percentListOutput"
                :disabled="disabled"
                :style="{ background: `linear-gradient(to right, #D2122B ${percentList / max * 100}%, #D2122B ${percentList / max * 100}%)` }" />

            <datalist id="timelist" :class="{ 'disabled': disabled }">
                <option v-for="i in range" :key="i" :value="i" label="">
                    {{ i }}
                </option>
            </datalist>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
    font-size: 16px;
    line-height: 16px;
    color: var(--main-black);

    @media screen and (max-width: 768px) {
        font-size: 14px;
        line-height: normal;
    }

    .output-first {
        font-weight: bold;
    }
}
.first__row{
    color: black;
    font-weight: 700;
}

.small {
    datalist {
        display: none;
    }
}

/* Thumb: webkit */
// input[type="range"]::-webkit-slider-thumb {
//     box-shadow: -407px 0 0 400px var(--main-color);
// }

// /* Thumb: Firefox */
// input[type="range"]::-moz-range-thumb {
//     box-shadow: -407px 0 0 400px var(--main-color);
// }

// input[type="range"] {
//     overflow: hidden;
//     height: 15px;
// }

// input[type="range"]::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     height: 15px;
//     width: 15px;
//     background-color: #fff;
// }

// /* Thumb: Firefox */
// input[type="range"]::-moz-range-thumb {
//     height: 15px;
//     height: 15px;
//     background-color: #fff;
// }</style>