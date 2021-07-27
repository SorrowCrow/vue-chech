<template>
    <div class="headerMenu">
        <div class="headerMenu__header">
            <svg class="headerMenu__header-icon">
                <use href="#logo" />
            </svg>
            <div class="headerMenu__header-time">08:00—22:00</div>
            <div class="ReservationExit" @click="($parent.isMenu = false), bodyDisplayAuto()">
                <svg>
                    <use href="#cross" />
                </svg>
            </div>
        </div>
        <div class="headerMenu__scrolls">
            <div @click="scroll('#about')">O nás</div>
            <div @click="scroll('#book')">Rezervace</div>
            <div @click="scrollslow('#giftCards')">Dárkové poukazy</div>
            <div @click="scrollslow('#reference')">Reference</div>
        </div>
        <a class="mx-auto headerMenu__number" href="tel:+420 286 851 738">+420 286 851 738</a>
        <div class="sub-title">
            Krnska 350/26, Praha 19700
            <a class="mx-auto headerMenu__email" href="mailto:sauna@marieluisa.cz">sauna@marieluisa.cz</a>
        </div>
        <div class="mx-auto headerMenu__links">
            <a href="https://facebook.com" target="_blank">
                <svg>
                    <use href="#facebook" />
                </svg>
            </a>
            <a href="https://instagram.com" target="_blank">
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
            window.scrollTo({
                top: document.querySelector(id).offsetTop,
                behavior: "smooth",
            });
        },
        bodyDisplayAuto() {
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
    position: fixed;
    color: $secondary;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-icon {
            width: 50px;
            height: 60px;
        }
        &-time {
            font-size: 18px;
        }
        .ReservationExit {
            background-color: $white;
            border-radius: 50%;
            position: relative;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.25s;
            &:hover {
                cursor: pointer;
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
        color: $deepblue;
        display: grid;
        justify-content: center;
        font-size: 30px;
        grid-row-gap: 20px;
        padding-top: 34px;
        padding-bottom: 81px;
        div {
            text-align: center;
            &:hover {
                cursor: pointer;
            }
        }
    }
    a {
        color: $deepblue;
        text-decoration: none;
    }
    &__number {
        height: fit-content;
        display: block;
        width: max-content;
        font-family: $playfair-font;
        font-size: 45px;
        text-align: center;
        letter-spacing: -0.03em;
        padding-bottom: 41px;
    }
    .sub-title {
        display: grid;
        text-align: center;
        color: $deepblue;
    }
    &__links {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 20px;
        width: min-content;
        padding-top: 45px;
        padding-bottom: 60px;
        svg {
            width: 50px;
            height: 50px;
            fill: $deepblue;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>