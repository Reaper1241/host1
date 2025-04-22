<script setup>
import Input from '@/components/Base/Input.vue';

import { options, name, errors } from "@/constants/";

const formFields = shallowRef([
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше ФИО', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);

const handleFormSubmit = (formData) => {
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" class="contact__form-form"
        :submit-text="`Оставить 11заявку`" :appType="9" />
</template>

<style scoped lang="scss">
.contact__form-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px 0;

    @media screen and (max-width: 560px) {
        display: flex;
        flex-direction: column;
    }

    .contact__form-submit {
        background: var(--main-color);
        padding: 15px;
        border-radius: var(--border-radius);
        color: white;
        font-weight: bold;
    }
}

.column {
    grid-template-columns: 1fr;
    gap: 15px;
}
</style>