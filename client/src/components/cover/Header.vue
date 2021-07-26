<template>
    <header class="header absolute">
        <div class="header__wrap flex content-between mx-auto" v-if="!isMenu">
            <div class="header__logo flex">
                <svg class="relative float-left" v-bind:class="displayMenu ? 'header__logo-icon' : 'header__logo-iconBig'">
                    <image href="../../../public/icon.svg" v-bind:class="displayMenu ? 'header__logo-icon' : 'header__logo-iconBig'" />
                </svg>
                <div class="header__logo-text relative" v-if="displayMenu">Sauna Kbely</div>
            </div>
            <div class="header__contacts flex content-between" v-if="displayMenu">
                <div class="header__contacts-item flex">
                    <svg>
                        <use href="#clock" />
                    </svg>
                    <div>08:00—22:00</div>
                </div>
                <div class="header__contacts-item flex">
                    <svg>
                        <use href="#location" />
                    </svg>
                    <a class="text-decoration-none" href="https://www.google.com/maps/place/Krnská+350,+197+00+Kbely,+Czechia/@50.1286805,14.5498908,19z" target="_blank" rel="noopener">Krnska 350/26, Praha 19700</a>
                </div>
                <div class="header__contacts-item flex">
                    <svg>
                        <use href="#phone" />
                    </svg>
                    <a class="text-decoration-none" href="tel:+420 286 851 738">+420 286 851 738</a>
                </div>
            </div>
            <svg v-else class="header__menu h-p" @click="isMenu = true">
                <use href="#headerMenu" />
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
    width: 100%;
    padding-top: 30px;
    z-index: 100;
    &__menu {
        width: 60px;
        height: 60px;
        padding-right: 30px;
        fill: $secondary;
    }
    &__wrap {
        max-width: 1440px;
        color: $white;
    }
    &__logo {
        padding-left: 30px;
        &-icon,
        &-iconBig {
            fill: $secondary;
            padding-right: 20px;
            width: 40px;
            height: 48px;
        }
        &-iconBig {
            width: 60px;
            height: 68px;
        }
        &-text {
            font-size: 35px;
            line-height: 41px;
            top: 7px;
        }
    }
    &__contacts {
        width: 884px;
        padding-right: 35px;
        margin-top: 16px;
        font-size: 25px;
        line-height: 29px;
        a {
            color: $white;
        }
        svg {
            padding-top: 2px;
            padding-right: 5px;
            width: 25px;
            height: 25px;
            fill: $secondary;
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .header {
        &__logo {
            padding-left: 75px;
        }
    }
}
</style>
