<script setup>
import Input from '@/components/Base/Input.vue';
import { options, name, errors } from "@/constants/";
import CreditBlock from '@/components/Base/CreditBlock.vue';

const props = defineProps({
    appType: {
        type: Number,
        default: 3,
    },
    car: {
        type: Object,
        default: null,
    }
});

const emits = defineEmits(['formSend']);

const formFields = shallowRef([
    { component: CreditBlock, bindings: { car: props.car, id: 'modal-credit' } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'ФИО', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: 'Номер телефона', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);


const handleFormSubmit = (formData) => {
    emits('formSend', true);
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Отправить заявку`" :appType="appType" :car="car"/>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .main__form-input {
        background: #fff;
        border-radius: var(--border-radius);
        padding: 15px;
        width: 100%;
    }

    .main__form-btn {
        text-align: center;
        border: 3px solid var(--main-color);
        background: var(--main-color);
        color: var(--bg-light);
        padding: 15px;
        font-size: 18px;
        transition: .3s;
        font-weight: 700;
        border-radius: var(--border-radius);
    }
}
</style>