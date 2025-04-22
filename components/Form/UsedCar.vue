<script setup>
import Input from '@/components/Base/Input.vue';
import FormTitle from '@/components/Base/FormTitle.vue';
import CreditBlock from '@/components/Base/CreditBlock.vue';

import { options, name, errors } from "@/constants/";

const props = defineProps({
    car: {
        type: Object,
        default: {}
    }
});

const formFields = shallowRef([
    { component: CreditBlock, bindings: { car: props.car } },
    { component: FormTitle, bindings: { title: 'Ваши данные' } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше ФИО', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);


const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Оставить заявку`" :appType="8" />
</template>

<style scoped lang="scss"></style>