<script setup>
import Input from '@/components/Base/Input.vue';
import FormTitle from '@/components/Base/FormTitle.vue';
import { options, errors,name } from "@/constants/";

const formFields = shallowRef([
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'ФИО', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: 'Номер телефона', modelValue: '', class: 'form-input', type: 'tel', maska: options } },

]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <section>
        <div class="container">
            <h3>
                Экспресс-кредит
            </h3>
            <div class="express__credit">
                <PieceBenefits/>
                <BaseForm class="form__input" :fields="formFields" @submit="handleFormSubmit" :submit-text="`Оставить заявку`" :appType="2"
                 />
            </div>
        </div>
        
    </section>
    
    
</template>

<style scoped lang="scss">
section{
    max-width: 1170px;
    border-radius: 10px;
    margin: 0 auto;  
    background: #fff;
    padding: 20px 0;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
}


h3{
    margin-bottom: 20px;
    @media screen and (max-width:570px) {
        display: block;
        height: auto;
        padding: 0 20px;
    }
}
.express__credit{
    display: grid;
    grid-template-columns: 3fr 1fr;

    @media screen and (max-width:1200px) {
       grid-template-columns: 2fr 1fr;
    }

    @media screen and (max-width:1000px) {
       grid-template-columns: 1.5fr 1fr;
    }
    
    @media screen and (max-width:767px) {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 30px;
        padding: 0 20px;
    }

    @media screen and (max-width:570px) {
        display: block;
        height: auto;
        padding: 0 20px;
    }
    .form__input{
        width: 400px;
    }
}
</style>