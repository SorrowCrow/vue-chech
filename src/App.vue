<template>
    <Cover />
    <AboutBlock />
    <BookBlock />
</template>

<script>
import Cover from "./components/Cover.vue";
import AboutBlock from "./components/AboutBlock.vue";
import BookBlock from "./components/BookBlock.vue";

export default {
    name: "App",
    components: {
        Cover,
        AboutBlock,
        BookBlock,
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Italiana&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");
body {
    font-family: $default-font;
    margin: 0;
    height: 10000px;
    --calendarGrid: 67px 0 67px 67px 67px 67px;
}

.pointer {
    cursor: pointer;
}
</style>