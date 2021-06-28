<template>
    <div class="block__slider hiddenForSlide">
        <img src="../../assets/background(1).jpg" />
        <img src="../../assets/background(1).jpg" />
    </div>
</template>

<script>
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.min.js";
import $ from "jquery";

export default {
    name: "Slider",
    mounted: function () {
        $(".block__slider").slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            prevArrow: '<div class="slideBtn nextBtn"><svg>  <use xlink:href="#arrowScroll" /> </svg></div>',
            nextArrow: '<div class="slideBtn prevBtn"><svg>  <use xlink:href="#arrowScroll" /> </svg></div>',
            responsive: [
                {
                    breakpoint: 768,
                },
            ],
        });
    },
};
</script>

<style lang="scss">
.block__slider {
    position: absolute;
    top: 0;
    width: 100%;
    max-height: 750px;

    img {
        max-height: 750px;
    }
}
.slideBtn {
    display: grid;
    @include wh(60px, 60px);
    position: absolute;
    background: $white;
    border-radius: 50%;
    bottom: 50%;
    z-index: 100;
    transition: 0.2s;
    svg {
        margin: auto;
        width: 36px;
        height: 36px;
        fill: $secondary;
    }
    &:hover {
        width: 70px;
        height: 70px;
        bottom: 49.5%;
        svg {
            fill: $primary;
            width: 36px;
            height: 36px;
        }
    }
}
.nextBtn:hover,
.prevBtn:hover {
    cursor: pointer;
}
.nextBtn {
    left: 50px;
}
.prevBtn {
    transform: rotate(180deg);
    right: 50px;
}
</style>