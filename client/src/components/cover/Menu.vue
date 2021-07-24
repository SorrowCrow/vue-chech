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
            return this.$mq === "md" ? true : this.$mq === "sm" ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.menu {
    color: $white;
    bottom: 65px;
    width: 970px;
    font-size: 25px;
    &__main {
        width: 617px;
    }
    &__social {
        width: 269px;
        a {
            color: $white;
        }
    }
}
</style>