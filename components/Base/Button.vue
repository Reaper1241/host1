<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'submit',
    },
    class: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: '',
    },
    mobileIcon: {
        type: String,
        default: '',
    },
})

const useWindowWidth = () => {
    const windowWidth = ref(0)
    if (process.client) {
        windowWidth.value = window.innerWidth
        window.addEventListener('resize', () => {
            windowWidth.value = window.innerWidth
        })
    }
    return {
        windowWidth,
    }
}
</script>

<template>
    <button class="base-button" :type="type" :class="class" :disabled="disabled">
        <i :class="icon" v-if="icon" />
        <i :class="mobileIcon" class="mobile" v-if="mobileIcon" />

        <span :class="{ 'hidden': mobileIcon }">{{ label }}</span>
    </button>
</template>


<style lang="scss" scoped>
.base-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    border-radius: 5px;
    color: var(--bg-light);
    background: #D2122B;
    // border-radius: var(--border-small-radius);
    font-weight: 700;
    font-size: 14px;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    width: 100%;
    max-width: none;
    @media screen and (max-width: 570px) {
        max-width: 100%;
    }
    // height: 100%;

    /*
    .icon:not(:last-child),
    .mobile:not(:last-child) {
        margin-right: 10px;
    }
        */

    i.mobile {
        display: none;

        @media screen and (max-width: 768px) {
            display: block;
        }
    }

    span {
        background: transparent;
        font-weight: bold;

        @media screen and (max-width: 540px) {
            font-weight: 600;
            font-size: var(--standart-size);
        }
    }

    span.hidden {
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
}

.trade {
    background: #3F5E73;
}

.callback {
    display: flex;
    flex-direction: row-reverse;
    border-radius: 40px;
    padding: 10px 25px;
    background: var(--color-c);
    border: 2px solid var(--blue);
    gap: 20px;
    transition: 0.3s;

    i {
        background: white;
        color: var(--blue);
        padding: 15px;
        border-radius: 100%;
        transition: 0.3s;
    }

    &:hover {
        background: white;
        color: var(--blue);
        border-color: white;
        transition: 0.3s;

        i {
            background: var(--blue);
            color: white;
            transition: 0.3s;
        }
    }
}

.slider__form {
    .base-submit {
        background: var(--main-color);
        border-radius: 50px;
    }
}

.test-drive {
    background: var(--main-color2);
    border: 2px solid var(--main-color2);
}

.trade {
    background: transparent;
    border: 2px solid var(--main-color);
    color: var(--main-color);
}

.call {
    background: var(--main-color);
    border: 2px solid var(--main-color);
}

.bh-1 {
    background: var(--main-color);
    border: 2px solid var(--main-color);
}

.base-button.load {
    width: auto;
}

.header {
    @media screen and (max-width: 768px) {
        border-radius: 100%;
        padding: 10px;

        i {
            font-size: var(--standard-size);
        }
    }
}

.comp {
    padding: 10px 25px;
    background: var(--main-color);
    border: 2px solid var(--main-color);

    @media screen and (max-width: 540px) {
        padding: 10px;
    }

    span {
        @media screen and (max-width: 540px) {
            font-size: var(--small-size);
            font-weight: 500;
        }
    }
}

.comp-credit {
    background: var(--green);
    border: 2px solid var(--green);
}

.bordered {
    border: 2px solid var(--main-color);
    background: transparent;
    color: var(--main-color);
    border-radius: var(--border-radius);
}

.classic {
    background: #D2122B;
    // border: 2px solid var(--main-color);
    color: white;
    font-size: 12px;

//    border-radius: var(--border-small-radius);
}
.taxi{
    .base-button{
        background: #fec000;
        color: #000;
    }
}
</style>
