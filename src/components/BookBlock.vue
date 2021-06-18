<template>
    <div class="contain mx-auto">
        <!-- <svg class="mx-auto wave">
            <use xlink:href="#wave" />
        </svg> -->
        <div class="title">Zarezervujete svoji návštěvu</div>
        <div class="sub-title">
            Vyberte datum a délku návštěvy a my nabídneme vám volné termíny
        </div>
        <div>
            <Calendar />
        </div>
    </div>
</template>

<script>
import Calendar from "./book/Calendar.vue";

export default {
    name: "BookBlock",
    components: {
        Calendar,
    },
};
</script>

<style lang="scss" scoped>
// .wave {
//     width: 1440px;
//     height: 22px;
// }
.contain {
    padding: 100px 235px 0 235px;
    max-width: 970px;
    background: #2e2b4d;
    color: #d4b8a6;
    .title {
        font-family: "Playfair Display", serif;
        font-size: 80px;
        line-height: 107px;
        width: 970px;
        letter-spacing: -0.03em;
    }
    .sub-title {
        font-size: 25px;
        line-height: 150%;
        width: max-content;
        color: white;
        max-width: 470px;
        padding-top: 30px;
        padding-bottom: 75px;
    }
}
</style>