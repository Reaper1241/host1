<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    }
})
</script>

<template>
    <section class="form-banner">
        <div class="container">
            <div class="form-banner__content">
                <div class="form-banner__column text">
                    <div class="form-banner__title" v-html="title" />
                    <div class="form-banner__subtitle">лучшие условия по автокредиту для покупки автомобиля мечты</div>
                    <div class="form-banner__form">
                        <FormBanner />
                    </div>
                </div>
                <div class="form-banner__column">
                    <img src="/assets/img/woman.webp" alt="car">
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.form-banner__content {
    margin-top: 5vh;
    display: grid;
    grid-template-columns: 3fr 2fr;
    background: #121212;
    border-radius: var(--border-radius);
    color: white;
    overflow: hidden;

    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column-reverse;
    }

    .form-banner__column {
        .form-banner__form {
            margin-top: 20px;
        }

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            max-height: 500px;
        }
    }

    .form-banner__column.text {
        display: flex;
        flex-direction: column;
        padding: 30px 60px 30px 30px;

        @media screen and (max-width: 1000px) {
            padding: 20px;
        }

        .form-banner__title {
            text-transform: uppercase;
            font-weight: bold;
            font-size: var(--big-size);
            margin-bottom: 20px;

            b {
                color: var(--main-color);
            }

            span {
                font-size: var(--extra-big-size);
                font-weight: 600;
            }
        }
    }
}
</style>