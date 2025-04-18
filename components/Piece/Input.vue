<script setup>

const props = defineProps({
    name: String,
    class: String,
    type: String,
    placeholder: String,
    // maska
    // v-model
    // error class
})
</script>


<template>
    <input :type="props.type" :name="props.name" :placeholder="props.placeholder" v-maska="name" :class="props.class"
        v-model="nameValue" autocomplete="off">
    <!-- :class="{ 'is-invalid': nameError }" -->
</template>


<style lang="scss" scoped></style>