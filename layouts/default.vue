<template>
    <Header />
    <main>
        <slot />
    </main>
    <PieceScrollTop/>

    <Footer />
</template>


<style lang="scss" scoped>
// main {
//     margin-top: 120px;

//     @media screen and (max-width: 768px) {
//         margin-top: 60px;
//     }
// }
</style>