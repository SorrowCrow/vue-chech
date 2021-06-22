<template>
    <div class="contain mx-auto">
        <div class="titleContainer mx-auto">
            <div class="title" id="giftCards">Dárkové poukazy</div>
            <div class="sub-title">Spa Experience gift vouchers/e-vouchers will contain a monetary value or treatment service.</div>
        </div>
        <svg>
            <use xlink:href="#droplet" />
        </svg>
    </div>
</template>

<script>
export default {
    name: "GiftCardsBlock",
};
</script>

<style lang="scss" scoped>
.contain {
    padding-top: 100px;
    padding-right: 135px;
    padding-left: 135px;
    padding-bottom: 143px;
    .titleContainer {
        max-width: 970px;
    }
}
.title{
    font-family: $playfair-font;
}
.title,
.sub-title {
    color: #69498c;
}
.sub-title {
    padding-top: 30px;
    padding-bottom: 115px;
    max-width: 670px;
}
</style>