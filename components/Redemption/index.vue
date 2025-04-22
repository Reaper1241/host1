<script setup>
</script>

<template>
    <div class="container">
        <h2></h2>
        <div class="content__box">
            <div class="form">
                <FormRedemptionNew/>
            </div>
            <div class="text page__text">
                <PieceRedemptionText/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content__box{
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        .form{
            width: 35%;
            @media screen and (max-width:1000px) {
                width: 40%;
            }
            @media screen and (max-width:767px) {
                width: 100%;
            }
        }
        .text{
            width: 60%;
            @media screen and (max-width:767px) {
                width: 100%;
            }
        }
    }
</style>