<template>
    <div class="menu mx-auto">
        <div class="menu__main">
            <div id="aboutButton">O nás</div>
            <div id="rezervaceButton">Rezervace</div>
            <div>Dárkové poukazy</div>
            <div>Reference</div>
        </div>
        <div class="menu__social">
            <a href="https://facebook.com" target="_blank">Facebook</a>
            <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
    </div>
</template>

<script>
import $ from "jquery";

$(document).ready(function () {
    $("#aboutButton").click(function () {
        $([document.documentElement, document.body]).animate(
            {
                scrollTop: $("#about").offset().top,
            },
            500
        );
    });
    $("#rezervaceButton").click(function () {
        $([document.documentElement, document.body]).animate(
            {
                scrollTop: $("#book").offset().top,
            },
            500
        );
    });
});

export default {
    name: "Menu",
};
</script>

<style lang="scss" scoped>
.menu {
    position: relative;
    bottom: 65px;
    width: 970px;
    display: flex;
    justify-content: space-between;
    z-index: 100;
    color: white;
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
            text-decoration: none !important;
            color: white;
        }
    }
}
</style>