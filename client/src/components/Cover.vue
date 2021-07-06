<template>
    <svgs />
    <Header />
    <Title />
</template>

<script>
import svgs from "./svgs.vue";
import Header from "./cover/Header.vue";
import Title from "./cover/Title.vue";

export default {
    name: "Cover",
    components: {
        svgs,
        Header,
        Title,
    },
};
</script>

<style lang="scss" scoped>
</style>