<template>
    <div class="menu mx-auto relative flex content-between" v-if="!isMd">
        <div class="menu__main flex content-between">
            <div class="h-p" @click="scroll('#about')">O nás</div>
            <div class="h-p" @click="scroll('#book')">Rezervace</div>
            <div class="h-p" @click="scroll('#giftCards')">Dárkové poukazy</div>
            <div class="h-p" @click="scroll('#reference')">Reference</div>
        </div>
        <div class="menu__social flex content-between">
            <a class="text-decoration-none" href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
            <a class="text-decoration-none" href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu",
    inject: ["windowInfo"],
    methods: {
        scroll(id) {
            window.scrollTo({
                top: document.querySelector(id).offsetTop,
                behavior: "smooth",
            });
        },
    },
    computed: {
        isMd() {
            return this.windowInfo.size * (this.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) < this.$md ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.menu {
    color: $white;
    bottom: 4.0625rem;
    width: 60.625rem;
    font-size: 1.5625rem;
    &__main {
        width: 38.5625rem;
    }
    &__social {
        width: 16.8125rem;
        a {
            color: $white;
        }
    }
}
</style>