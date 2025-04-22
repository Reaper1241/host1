<script setup>
function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 0
}

onBeforeMount(() => {
    window.addEventListener('scroll', handleScroll)
});

onMounted(() => {
    handleScroll();
});

onBeforeUnmount(() => {
    window.addEventListener('scroll', handleScroll)
});
</script>

<template>
    <div @click="toTop" class="go-to-top" :class="{ 'scrolled': isScrolled }"></div>
</template>

<style scoped lang="scss">
.go-to-top {
    display: none;
    position: fixed;
    bottom: 10px;
    right: 5px;
    width: 50px;
    height: 50px;
    background: url(/svg/arrow-up.svg) no-repeat center;
    background-size: contain;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 99;

    &:hover {
        transform: scale(1.01);
    }
}
.scrolled{
    display: block;
}
</style>