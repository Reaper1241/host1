<script setup>
import { vMaska } from "maska/vue"
import { errors } from "~/constants";

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: '',
    },
    maska: {
        type: Object,
        default: {},
    },
    class: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

function handleMaska(event) {
    emit('update:modelValue', event.target.value)
}
</script>

<template>
    <div class="base-input">
        <!-- :class="class"; -->
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type"
            :placeholder="placeholder" :required="required" :disabled="disabled" v-maska="maska" @maska="handleMaska" />
        <span class="error-alert" v-if="error"><i class="fa-solid fa-triangle-exclamation"></i> {{ error }}</span>
    </div>
</template>

<style scoped lang="scss">
.base-input {
  width: 100%;

  

  input {
    width: 100%;

    padding: 15px 15px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    height: 45px;
    &:focus {
      border-color: #D2122B;
      box-shadow: 0 0 0 1px #D2122B;
    }

    &::placeholder {
      color: black;
      font-size: 14px;
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  .error-alert {
    color: #e53935;
    font-size: 13px;
    margin-top: 4px;
    display: block;

    i {
      margin-right: 5px;
    }
  }
}
</style>