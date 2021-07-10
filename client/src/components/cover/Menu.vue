<template>
    <div class="menu mx-auto" v-if="!isMd">
        <div class="menu__main">
            <div @click="scroll('#about')">O nás</div>
            <div @click="scroll('#book')">Rezervace</div>
            <div @click="scroll('#giftCards')">Dárkové poukazy</div>
            <div @click="scroll('#reference')">Reference</div>
        </div>
        <div class="menu__social">
            <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
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
    position: relative;
    bottom: 65px;
    width: 970px;
    display: flex;
    justify-content: space-between;
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