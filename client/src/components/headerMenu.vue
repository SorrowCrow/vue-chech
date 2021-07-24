<template>
    <div class="headerMenu scroll-hidden y-scroll fixed">
        <div class="headerMenu__header flex content-between align-center">
            <svg class="headerMenu__header-icon">
                <use href="#logo" />
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
            document.getElementsByTagName("body")[0].style.overflow = "auto";
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
    padding: 30px;
    background-color: $backgroundgrey;
    color: $deepblue;
    &__header {
        &-icon {
            width: 50px;
            height: 60px;
        }
        &-time {
            color: $secondary;
            font-size: 18px;
        }
        .ReservationExit {
            background-color: $white;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            transition: transform 0.25s;
            &:hover {
                transform: rotate(90deg);
                svg {
                    fill: $orange;
                }
            }
            svg {
                width: 21px;
                height: 21px;
                fill: $secondary;
            }
        }
    }
    &__scrolls {
        font-size: 30px;
        grid-row-gap: 20px;
        padding-top: 34px;
        padding-bottom: 81px;
    }
    a {
        color: $deepblue;
    }
    &__number {
        font-family: $playfair-font;
        font-size: 45px;
        letter-spacing: -0.03em;
        padding-bottom: 41px;
    }
    &__links {
        padding-top: 45px;
        padding-bottom: 60px;
        a {
            margin-left: 10px;
            margin-right: 10px;
        }
        svg {
            width: 50px;
            height: 50px;
            fill: $deepblue;
        }
    }
}
</style>