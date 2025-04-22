<script setup>
const timeList = ref(7);
const timeListOutputData = ref('7 лет');

const emits = defineEmits(['timeListOutput']);
const props = defineProps(['disabled', 'class'])
const max = ref(7);

emits('timeListOutput', timeList.value)

watch(timeList, (newTimeList, oldTimeList) => {
    if (newTimeList === '0' || newTimeList === '0') {
        timeListOutputData.value = '6 мес.';
    } else if (newTimeList === '1') {
        timeListOutputData.value = '1 год';
    } else if (newTimeList === '2') {
        timeListOutputData.value = '2 года';
    } else if (newTimeList === '3') {
        timeListOutputData.value = '3 года';
    } else if (newTimeList === '4') {
        timeListOutputData.value = '4 года';
    } else if (newTimeList === '5') {
        timeListOutputData.value = '5 лет';
    } else if (newTimeList === '6') {
        timeListOutputData.value = '6 лет';
    } else if (newTimeList === '7') {
        timeListOutputData.value = '7 лет';
    }
})

watch(timeList, (newTimeList, oldTimeList) => {
    emits('timeListOutput', timeList.value)
})

</script>

<template>
    <div class="time-block" :class="class">
        <label class="timeOut" for="credit-page--time">
            Срок кредитования
            <!-- <span class="output-time">
                {{ timeListOutputData }}
            </span> -->
        </label>

        <div class="range-slider">
            <div class="range-slider__value">
                <div class="value__left">6 мес.</div>
                <div class="value__right">7 лет</div>
            </div>

            <input class="range-slider__input range-input" type="range" min="0" max="7" id="range" list="timelist"
                step="1" v-model="timeList" @change="timeListOutput" :disabled="props.disabled"
                :style="{ background: `linear-gradient(to right, #D2122B ${timeList / max * 100}%, #D2122B ${timeList / max * 100}%)` }" />
            <datalist id="timelist" :class="{ 'disabled': props.disabled }">
                <option value="0" label="6 мес."></option>
                <option value="1" label="1 год"></option>
                <option value="2" label="2 года"></option>
                <option value="3" label="3 года"></option>
                <option value="4" label="4 года"></option>
                <option value="5" label="5 лет"></option>
                <option value="6" label="6 лет"></option>
                <option value="7" label="7 лет"></option>
            </datalist>
            <div class="range-slider__progress">
            </div>
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
    font-weight: 700;
    font-size: var(--standart-size);
    line-height: 16px;
    color: var(--light);
}
.timeOut{
    color: black;
    font-weight: 700;
}
.small {
    datalist {
        display: none;
    }
}

.timeOut {
    justify-content: space-between;
    display: flex;
    padding-bottom: 15px;

    .output-time {
        font-weight: bold;
    }
}
</style>