<template>
    <div class="menu mx-auto" v-if="!isMd">
        <div class="menu__main">
            <div id="aboutButton" @click="scroll('#about')">O nás</div>
            <div id="rezervaceButton" @click="scroll('#book')">Rezervace</div>
            <div id="giftCardsButton" @click="scrollslow('#giftCards')">Dárkové poukazy</div>
            <div id="referenceButton" @click="scrollslow('#reference')">Reference</div>
        </div>
        <div class="menu__social">
            <a href="https://facebook.com" target="_blank">Facebook</a>
            <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "Menu",
    methods: {
        scroll(id) {
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $(id).offset().top,
                },
                500
            );
        },
        scrollslow(id) {
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $(id).offset().top,
                },
                1000
            );
        },
    },
    computed: {
        isMd() {
            return this.$mq === "md" ? true : this.$mq === "sm" ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.menu {
    position: relative;
    bottom: 65px;
    width: 970px;
    display: flex;
    justify-content: space-between;
    z-index: 100;
    color: $white;
    font-size: 25px;
    &__main {
        display: flex;
        justify-content: space-between;
        width: 617px;
        div:hover {
            cursor: pointer;
        }
    }
    &__social {
        display: flex;
        justify-content: space-between;
        width: 269px;
        a {
            text-decoration: none;
            color: $white;
        }
    }
}
</style>