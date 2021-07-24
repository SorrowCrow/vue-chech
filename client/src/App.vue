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
.unHiddenForSlide {
    .block__slider img {
        filter: blur(0);
    }
    .block__sliderButtons {
        opacity: 1;
        &-nextBtn,
        &-prevBtn {
            &:hover {
                cursor: pointer;
                width: 70px;
                height: 70px;
                svg {
                    fill: $primary;
                }
            }
        }
    }
}
.hiddenTitle {
    opacity: 0;
    overflow: hidden;
    transition-timing-function: linear, step-end;
}
</style>