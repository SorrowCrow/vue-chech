<template>
    <svgs />
    <Title />
    <AboutBlock />
    <BookBlock />
    <GiftCardsBlock />
    <ReferenceBlock />
</template>

<script>
import svgs from "./components/svgs.vue";
import Title from "./components/cover/Title.vue";
import AboutBlock from "./components/AboutBlock.vue";
import BookBlock from "./components/BookBlock.vue";
import GiftCardsBlock from "./components/GiftCardsBlock.vue";
import ReferenceBlock from "./components/ReferenceBlock.vue";

// window.getComputedStyle(document.getElementsByTagName("body")[0], null).getPropertyValue("font-size")
export default {
    name: "App",
    data() {
        return {
            windowInfo: { size: window.innerWidth, isMd: this.isMd, displayMenu: this.displayMenu },
        };
    },
    provide() {
        return {
            windowInfo: this.windowInfo,
        };
    },
    created() {
        window.addEventListener("resize", this.getWindowSize);
    },
    methods: {
        getWindowSize() {
            this.windowInfo.size = window.innerWidth;
            this.windowInfo.isMd = this.isMd;
            this.windowInfo.displayMenu = this.displayMenu;
        },
    },
    mounted() {
        this.windowInfo.isMd = this.isMd;
        this.windowInfo.displayMenu = this.displayMenu;
    },
    computed: {
        isMd() {
            return this.windowInfo.size * (this.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) < this.$md ? true : false;
        },
        displayMenu() {
            return this.windowInfo.size * (this.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) > this.$header ? true : false;
        },
    },
    components: {
        svgs,
        Title,
        AboutBlock,
        BookBlock,
        GiftCardsBlock,
        ReferenceBlock,
    },
};
</script>

<style lang="scss">
body {
    overflow-x: hidden;
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
                width: 4.375rem;
                height: 4.375rem;
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