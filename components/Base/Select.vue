<script setup>
defineProps({
    options: Array,
    modelValue: [String, Number],
    label: String,
    disabled: Boolean,
    name: {
        type: String,
        default: 'name',
    },
    id: {
        type: String,
        default: 'id',
    },
    noZeroOption: {
        type: Boolean,
        default: true,
    }
})

// const emit = defineEmits(['update:modelValue'])
const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
    emit('update:modelValue', event.target.value)
    emit('change', event.target.value)
}
</script>

<template>
    <label class="filter__body-select">
        <select :value="modelValue" @change="handleChange" :disabled="disabled">
            <option :value="0" v-if="noZeroOption">{{ label }}</option>
            <option v-for="(option, index) in options" :key="option.id" :value="id === 'id' ? option[id] : index">
                {{ option[name] }}
            </option>
        </select>
        <button class="filter__body-select-reset" :disabled="disabled" v-if="modelValue > 0"><i
                class="fa-regular fa-circle-xmark"
                @click="emit('update:modelValue', 0), emit('change', 0)"></i></button>
    </label>
</template>

<style lang="scss" scoped>
.filter__body-select {
    flex-grow: 1;
    position: relative;
    

    .filter__body-select-reset {
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        border-radius: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-self: center;
        color: var(--main-black);
        z-index: 2;

        i {
            height: 100%;
        }
    }

    .filter__body-select-reset[disabled] {
        display: none;
    }

    // &:after {
    //     content: "\f107";
    //     position: absolute;
    //     right: 10px;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     font-family: "Font Awesome 6 Free";
    //     font-weight: 900;
    //     pointer-events: none;
    //     background: white;
    //     padding: 3px 4px;
    //     border-radius: 100%;
    //     text-align: center;
    // }

    @media screen and (max-width: 500px) {
        grid-column-start: 1;
    }

    select {
        background: #EEEEEE;
        min-width: 210px;
        width: 100%;
        padding: 15px 15px;
        color: #767676;
        border-radius: 5px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: none;
        height: 45px;
        &::-ms-expand {
            display: none;
        }
    //    border-radius: var(--border-small-radius);

        option {
            padding: 5px;
        }
    }

    select.active {
        font-weight: 700;
    
    }
}

.wide {
    grid-column-start: 1;
    grid-column-end: 3;
}

.new__filter-select{
    select{
        min-width: 100px;
        background: linear-gradient(45deg, transparent 50%, var(--color-d) 0), linear-gradient(135deg, var(--color-d) 50%, transparent 0), linear-gradient(90deg, transparent, transparent);
        background-position: calc(100% - 11px) calc(1em + 0px), calc(100% - 6px) calc(1em + 0px), 100% 0;
        background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
        background-repeat: no-repeat;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
       
            padding: 7px 15px;
            border: 1px solid #ccc;
            position: relative;
            z-index: 1;
            font-size: inherit;
            width: 100%;
            
    }

}
</style>