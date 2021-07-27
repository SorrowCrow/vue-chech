<template>
    <svgs />
    <Header />
    <Title />
    <AboutBlock />
    <BookBlock />
    <GiftCardsBlock />
    <ReferenceBlock />
</template>

<script>
import svgs from "./components/svgs.vue";
import Header from "./components/cover/Header.vue";
import Title from "./components/cover/Title.vue";
import AboutBlock from "./components/AboutBlock.vue";
import BookBlock from "./components/BookBlock.vue";
import GiftCardsBlock from "./components/GiftCardsBlock.vue";
import ReferenceBlock from "./components/ReferenceBlock.vue";

export default {
    name: "App",
    components: {
        svgs,
        Header,
        Title,
        AboutBlock,
        BookBlock,
        GiftCardsBlock,
        ReferenceBlock,
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Italiana&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");

#app {
    overflow-x: hidden;
}

body {
    font-family: $default-font;
    margin: 0;
    cursor: default;
}

.pointer {
    cursor: pointer;
}
.max-content {
    width: max-content;
}
.unHiddenForSlide {
    .block__slider img {
        filter: blur(0);
    }
    .block__sliderButtons {
        opacity: 1;
    }
}
.hiddenTitle {
    opacity: 0;
    overflow: hidden;
    transition-timing-function: linear, step-end;
}
.newhidden {
    position: absolute;
    height: 0;
    transition-timing-function: linear, step-end;
}
.positionRelative {
    position: relative;
}
.hidden {
    opacity: 0;
    height: 0;
    // transition-timing-function: linear, step-end;
}
.unhidden {
    opacity: 1 !important;
    height: 300px !important;
}
</style>