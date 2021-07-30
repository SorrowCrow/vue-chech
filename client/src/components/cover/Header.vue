<template>
    <header class="header absolute">
        <div class="header__wrap flex content-between mx-auto align-center" v-if="!isMenu">
            <div class="header__logo flex">
                <svg class="relative float-left" v-bind:class="displayMenu ? 'header__logo-icon' : 'header__logo-iconBig'">
                    <image href="../../../public/icon.svg" v-bind:class="displayMenu ? 'header__logo-icon' : 'header__logo-iconBig'" />
                </svg>
                <div class="header__logo-text relative" v-if="displayMenu">Sauna Kbely</div>
            </div>
            <div class="header__contacts content-between flex" v-if="displayMenu">
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
    data() {
        return {
            isMenu: false,
        };
    },
    inject: ["windowInfo"],
    computed: {
        displayMenu() {
            return this.windowInfo.size * (this.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) > this.$header ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    margin-top: 1.875rem;

    z-index: 1;
    &__menu {
        width: 3.75rem;
        height: 3.75rem;
        fill: $secondary;
    }
    &__wrap {
        max-width: 90rem;
        // margin-right: 2.1875rem;
        padding-right: 1.875rem;
        padding-left: 1.875rem;
        color: $white;
    }
    &__logo {
        fill: $secondary;
        &-icon {
            width: 2.5rem;
            height: 3rem;
        }
        &-iconBig {
            width: 3.75rem;
            height: 4.25rem;
        }
        &-text {
            font-size: $font-35;
            margin-top: 0.4375rem;
            margin-left: 1.25rem;
        }
    }
    &__contacts {
        width: 55.25rem;
        margin-top: 1rem;
        font-size: 1.5625rem;
        a {
            color: $white;
        }
        svg {
            padding-top: 0.125rem;
            padding-right: 0.3125rem;
            width: 1.5625rem;
            height: 1.5625rem;
            fill: $secondary;
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .header {
        &__logo {
            margin-left: 2.8175rem;
        }
    }
}
</style>
