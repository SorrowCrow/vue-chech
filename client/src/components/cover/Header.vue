<template>
    <header class="header">
        <div class="header__wrap mx-auto" v-if="!isMenu">
            <div class="header__logo">
                <svg v-bind:class="displayMenu ? 'header__logo-icon' : 'header__logo-iconBig'">
                    <use xlink:href="#logo" />
                </svg>
                <div class="header__logo-text" v-if="displayMenu">Sauna Kbely</div>
            </div>
            <div class="header__contacts" v-if="displayMenu">
                <div class="header__contacts-item">
                    <svg>
                        <use xlink:href="#clock" />
                    </svg>
                    <div>08:00—22:00</div>
                </div>
                <div class="header__contacts-item">
                    <svg>
                        <use xlink:href="#location" />
                    </svg>
                    <a href="https://www.google.com/maps/place/Krnská+350,+197+00+Kbely,+Czechia/@50.1286805,14.5498908,19z" target="_blank">Krnska 350/26, Praha 19700</a>
                </div>
                <div class="header__contacts-item">
                    <svg>
                        <use xlink:href="#phone" />
                    </svg>
                    <a href="tel:+420 286 851 738">+420 286 851 738</a>
                </div>
            </div>
            <svg v-else class="header__menu" @click="isMenu = true">
                <use xlink:href="#headerMenu" />
            </svg>
        </div>
        <HeaderMenu v-else-if="!displayMenu" />
    </header>
</template>

<script>
import HeaderMenu from "../headerMenu.vue";

export default {
    name: "Header",
    components: {
        HeaderMenu,
    },
    computed: {
        displayMenu() {
            return this.$mq === "lg" ? true : false;
        },
    },
    data() {
        return {
            isMenu: false,
        };
    },
    methods: {
        isDisplayMenu() {
            if (this.displayMenu) {
                this.isMenu = false;
                document.getElementsByTagName("body")[0].style.overflow = "auto";
            }
        },
    },
    mounted() {
        // Register an event listener when the Vue component is ready
        window.addEventListener("resize", this.isDisplayMenu);
    },
};
</script>

<style lang="scss" scoped>
.header {
    position: absolute;
    width: 100%;
    padding-top: 30px;
    z-index: 100;
    &__menu {
        width: 60px;
        height: 60px;
        padding-right: 30px;
        fill: $secondary;
        &:hover {
            cursor: pointer;
        }
    }
    &__wrap {
        max-width: 1440px;
        color: $white;
        display: flex;
        justify-content: space-between;
    }
    &__logo {
        padding-left: 75px;
        display: flex;
        &-icon,
        &-iconBig {
            fill: $secondary;
            position: relative;
            float: left;
            padding-right: 20px;
            @include wh(40px, 48px);
        }
        &-iconBig {
            @include wh(60px, 68px);
        }
        &-text {
            position: relative;
            font-size: 35px;
            line-height: 41px;
            top: 7px;
        }
    }
    &__contacts {
        display: flex;
        justify-content: space-between;
        width: 884px;
        padding-right: 35px;
        a {
            color: $white;
            text-decoration: none;
        }
        div,
        svg {
            position: relative;
        }
        div {
            font-size: 25px;
            line-height: 29px;
        }
        svg {
            float: left;
            padding-top: 2px;
            padding-right: 5px;
            @include wh(25px, 25px);
            fill: $secondary;
        }
        &-item {
            display: flex;
            margin-top: 16px;
        }
    }
}
</style>
