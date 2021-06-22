<template>
    <svg class="mx-auto containerWave">
        <use xlink:href="#containerWave" />
    </svg>
    <footer class="contain">
        <div class="content mx-auto">
            <div class="carouselContainer">
                <div class="footer__carousel" id="reference">
                    <div class="footer__carousel-slide">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
                    <div class="footer__carousel-slide">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
                </div>
                <svg class="mx-auto wave">
                    <use xlink:href="#wave" />
                </svg>
            </div>
            <a class="mx-auto content__number" href="tel:+420 286 851 738">+420 286 851 738</a>
            <div class="sub-title">
                Krnska 350/26, Praha 19700
                <a class="mx-auto content__email" href="mailto:sauna@marieluisa.cz">sauna@marieluisa.cz</a>
            </div>
            <div class="mx-auto content__links">
                <a href="https://facebook.com" target="_blank">
                    <svg>
                        <use xlink:href="#facebook" />
                    </svg>
                </a>
                <a href="https://instagram.com" target="_blank">
                    <svg>
                        <use xlink:href="#instagram" />
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.min.js";
import $ from "jquery";

$(document).ready(function () {
    $(".footer__carousel").slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        prevArrow: '<div class="footer__carousel-nextBtn"><svg>  <use xlink:href="#arrowScroll" /> </svg></div>',
        nextArrow: '<div class="footer__carousel-prevBtn"><svg>  <use xlink:href="#arrowScroll" /> </svg></div>',
        responsive: [
            {
                breakpoint: 768,
            },
        ],
    });
});
export default {
    name: "ReferenceBlock",
};
</script>

<style lang="scss">
.footer__carousel {
    display: grid;
    justify-content: center;
    grid-template-columns: 60px 770px 60px;
    &-nextBtn,
    &-prevBtn {
        display: grid;
        align-self: center;
        @include wh(60px, 60px);
        background: #ffffff;
        border-radius: 50%;
        transition: 0.2s;
        svg {
            margin: auto;
            width: 36px;
            height: 36px;
            fill: #2b3a77;
        }
        &:hover {
            cursor: pointer;
            width: 70px;
            height: 70px;
            bottom: 49.5%;
            svg {
                width: 36px;
                height: 36px;
            }
        }
        margin-right: 30px;
    }
    &-prevBtn {
        transform: rotate(180deg);
    }
    &-slide {
        text-align: center;
        font-weight: 300;
        font-size: 50px;
        line-height: 150%;
        width: 770px;
    }
}
</style>

<style lang="scss" scoped>
.containerWave {
    position: absolute;
    width: 100%;
    height: 22px;
    fill: #f5f2ef;
}
.contain {
    color: #2b3a77;
    margin-top: 21px;
    background: #f5f2ef;
    .content {
        max-width: 970px;
        .carouselContainer {
            padding-top: 131px;
            .wave {
                padding-top: 50px;
                padding-bottom: 44px;
                width: 100%;
                fill: black;
                fill-opacity: 0.03;
            }
        }
        a {
            color: #2b3a77;
            text-decoration: none;
        }
        &__number {
            display: block;
            width: max-content;
            font-family: $playfair-font;
            font-size: 100px;
            line-height: 133px;
            text-align: center;
            letter-spacing: -0.03em;
            padding-bottom: 41px;
        }
        .sub-title {
            display: grid;
            text-align: center;
        }
        &__links {
            display: flex;
            width: min-content;
            padding-top: 45px;
            padding-bottom: 60px;
            svg {
                margin-left: 15px;
                margin-right: 15px;
                width: 50px;
                height: 50px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>