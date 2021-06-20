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
    height: 3000px;
    cursor: default;
}

.pointer {
    cursor: pointer;
}
.max-content {
    width: max-content;
}
.hiddenForSlide {
    opacity: 0;
    overflow: hidden;
    transition-timing-function: linear, step-end;
}
.unhiddenForSlide {
    opacity: 1;
    overflow: hidden;
    transition-timing-function: linear, step-end;
    z-index: 10;
}
.newhidden {
    position: absolute;
    height: 0;
    transition-timing-function: linear, step-end;
}
.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition-timing-function: linear, step-end;
}
.positionRelative{
    position: relative;
}
</style>