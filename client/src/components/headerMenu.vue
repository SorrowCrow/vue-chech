<template>
    <div class="headerMenu scroll-hidden y-scroll fixed">
        <div class="headerMenu__header flex content-between align-center">
            <svg class="headerMenu__header-icon">
                <image href="../../public/icon.svg" class="headerMenu__header-icon" />
            </svg>
            <div class="headerMenu__header-time">08:00—22:00</div>
            <div class="ReservationExit flex relative content-center align-center h-p" @click="($parent.isMenu = false), bodyDisplayAuto()">
                <svg>
                    <use href="#cross" />
                </svg>
            </div>
        </div>
        <div class="headerMenu__scrolls grid content-center">
            <div class="text-center h-p" @click="scroll('#about')">O nás</div>
            <div class="text-center h-p" @click="scroll('#book')">Rezervace</div>
            <div class="text-center h-p" @click="scroll('#giftCards')">Dárkové poukazy</div>
            <div class="text-center h-p" @click="scroll('#reference')">Reference</div>
        </div>
        <a class="mx-auto headerMenu__number text-decoration-none block h-fit-content text-center max-content" href="tel:+420 286 851 738">+420 286 851 738</a>
        <div class="sub-title grid text-center">
            Krnska 350/26, Praha 19700
            <a class="mx-auto headerMenu__email text-decoration-none" href="mailto:sauna@marieluisa.cz">sauna@marieluisa.cz</a>
        </div>
        <div class="mx-auto headerMenu__links flex min-content">
            <a class="text-decoration-none h-p inline-block" href="https://facebook.com" target="_blank" rel="noopener">
                <svg>
                    <use href="#facebook" />
                </svg>
            </a>
            <a class="text-decoration-none h-p inline-block" href="https://instagram.com" target="_blank" rel="noopener">
                <svg>
                    <use href="#instagram" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeaderMenu",
    methods: {
        scroll(id) {
            this.bodyDisplayAuto();
            window.scrollTo({
                top: document.querySelector(id).offsetTop,
                behavior: "smooth",
            });
        },
        bodyDisplayAuto() {
            this.$parent.isMenu = false;
            document.getElementsByTagName("body")[0].style.overflow = "";
        },
    },
    mounted: function () {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    },
};
</script>

<style lang="scss" scoped>
.headerMenu {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 150;
    padding: 1.875rem;
    background: $backgroundgrey;
    color: $deepblue;
    &__header {
        &-icon {
            width: 3.125rem;
            height: 3.75rem;
        }
        &-time {
            color: $secondary;
            font-size: $font-18;
        }
        .ReservationExit {
            background-color: $white;
            border-radius: 50%;
            width: 3.75rem;
            height: 3.75rem;
            transition: $transition-fast;
            &:hover {
                transform: rotate(90deg);
                svg {
                    fill: $orange;
                }
            }
            svg {
                width: 1.3125rem;
                height: 1.3125rem;
                fill: $secondary;
            }
        }
    }
    &__scrolls {
        font-size: 1.875rem;
        grid-row-gap: 1.25rem;
        padding-top: 2.125rem;
        padding-bottom: 5.0625rem;
    }
    a {
        color: $deepblue;
    }
    &__number {
        font-family: $playfair-font;
        font-size: 2.8125rem;
        letter-spacing: -0.03em;
        padding-bottom: 2.5625rem;
    }
    &__links {
        padding-top: 2.8125rem;
        padding-bottom: 3.75rem;
        a {
            margin-left: 0.625rem;
            margin-right: 0.625rem;
        }
        svg {
            width: 3.125rem;
            height: 3.125rem;
            fill: $deepblue;
        }
    }
}
</style>