<template>
    <div class="contain mx-auto" id="about">
        <div class="title-container">
            <div>
                <div class="title">O nás</div>
                <div class="sub-title">
                    Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free
                    Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.
                </div>
            </div>
            <div class="magGlassDisplay">
                <div class="MagnifyingGlass">
                    <svg>
                        <use xlink:href="#magnifyingGlass" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="services mx-auto">
            <div class="services__item">
                <svg class="frame1">
                    <use xlink:href="#frame1" />
                </svg>
                Vířivka
            </div>
            <div class="services__item">
                <svg class="frame2">
                    <use xlink:href="#frame2" />
                </svg>
                Sauna
            </div>
            <div class="services__item">
                <svg class="frame3">
                    <use xlink:href="#frame3" />
                </svg>
                Bazén
            </div>
            <div class="services__item">
                <svg class="frame4">
                    <use xlink:href="#frame4" />
                </svg>
                Odpočívárna
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
$(document).ready(function () {
    $(".MagnifyingGlass").on("click", function () {
        console.log("asdasd");
        $([document.documentElement, document.body]).animate(
            {
                scrollTop: $("#cover").offset().top,
            },
            500
        );
        $("#sliderInit").addClass("hiddenForSlide", 1000);
        $(".background").addClass("hiddenForSlide", 1000);
        $(".block__slider").removeClass("hiddenForSlide", 1000);
    });
});

export default {
    name: "AboutBlock",
};
</script>

<style lang="scss" scoped>
.contain {
    padding-top: 65px;
    padding-bottom: 36px;
    color: #2b3a77;
    max-width: 1170px;
    .title-container {
        padding-left: 100px;
        background-image: url("../assets/pic.jpg");
        background-position: top right;
        background-repeat: no-repeat;
        display: grid;
        grid-template-columns: auto auto;
        .title {
            width: max-content;
            padding-top: 53px;
            line-height: 107px;
        }
        .sub-title {
            display: flex;
            align-items: center;
            position: relative;
            left: -100px;
            padding-left: 100px;
            padding-right: 100px;
            margin-top: 58px;
            max-width: 570px;
            height: 350px;
            background: #f5f2ef;
            border-radius: 150px 300px 300px 0px;
            z-index: 10;
        }
        .magGlassDisplay {
            display: flex;
            .MagnifyingGlass {
                position: relative;
                align-self: flex-end;
                display: grid;
                @include wh(100px, 100px);
                background: #ffffff;
                border-radius: 50%;
                z-index: 100;
                transition: 0.2s;
                bottom: 30px;
                left: 70px;
                svg {
                    margin: auto;
                    width: 50px;
                    height: 50px;
                    stroke: #2b3a77;
                }
                &:hover {
                    width: 110px;
                    height: 110px;
                    cursor: pointer;
                    svg {
                        stroke: #ff7a00;
                    }
                }
            }
        }
    }
    .services {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 1010px;
        padding-top: 80px;
        font-family: "Playfair Display", serif;
        &__item {
            @include wh(230px, 197px);
            display: grid;
            justify-content: center;
            text-align: center;
            font-size: 30px;
            line-height: 40px;
            svg {
                padding-bottom: 35px;
            }
            .frame1 {
                width: 150px;
                height: 129px;
                padding-top: 2px;
            }
            .frame2 {
                width: 100px;
                height: 113px;
                padding-top: 18px;
            }
            .frame3 {
                width: 150px;
                height: 97px;
                padding-top: 35px;
            }
            .frame4 {
                width: 200px;
                height: 113px;
                padding-top: 26px;
                padding-bottom: 27px;
            }
        }
    }
}
</style>