<script setup>
const checked = ref(true);
const emit = defineEmits(['formChecked']);
</script>

<template>
    <div class="form__check">
        <label class="form__check-label" :class="$attrs.class">
            <input class="radio__hidden" type="checkbox" v-model="checked"
                @click="emit('formChecked', !checked), checked = !checked">
            <span class="radio__img" :class="checked ? 'checked' : ''"></span>
            <p>Согласен на <NuxtLink to="/politics/" target="_blank">
                    обработку персональных данных</NuxtLink>
            </p>
        </label>
    </div>
</template>

<style scoped lang="scss">
.form__check {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: fit-content;
    margin-bottom: 10px;
   
    // padding: 5px 10px;
    // background: white;
//    border-radius: var(--border-small-radius);

    .form__check-label {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 12px;
        color: var(--main-black);

        .radio__img {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: transparent;
            border: 1px solid #ccc;
            padding: 3px;
            margin-right: 10px;
            flex: none;
            &::before {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .checked {
            &::before {
                background-color: var(--color-c);
            }
        }

        a {
            color: inherit; // будет как у родительского (чёрный, если p — чёрный)
            text-decoration: underline;
            font-weight: 500;
            display: inline;
        }
    }
}

.online__trade-form {
    .check-black p {
        color: black;
    }
}

.radio__hidden:not(:checked)+.radio__img::before {
    background: none;
}

label.form__check-label.white p {
    color: white;
}

.wide {
    grid-column-start: 1;
    grid-column-end: 3;
}

.small {
    p {
        font-size: 10px;

        a {
            font-size: 10px !important;
        }
    }
}

.wide-grid {
    grid-column-start: 1;
    grid-column-end: 3;
}
</style>