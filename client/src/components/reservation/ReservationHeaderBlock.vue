<template>
    <div class="ReservationHeaderBlock">
        <svg v-if="isMd" class="ReservationHeaderBlock-icon">
            <use xlink:href="#logo" />
        </svg>
        <div class="title">Rezervace</div>
        <div class="ReservationInfo">
            <div class="ReservationInfo-date">{{ date }}</div>
            <div v-if="isMd">,&nbsp;</div>
            <div class="ReservationInfo-hours">{{ time }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReservationHeaderBlock",
    props: {
        time: String,
        date: String,
    },
    computed: {
        isMd() {
            return this.$mq === "md" ? true : this.$mq === "sm" ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.ReservationHeaderBlock {
    color: $deepblue;
    display: grid;
    padding-right: 30px;
    padding-left: 30px;
    margin: 0 auto;
    max-width: 769px;
    &-icon {
        width: 50px;
        height: 60px;
        margin-bottom: 38px;
    }
    .title {
        width: min-content;
    }
    .ReservationInfo {
        margin-top: 7px;
        display: flex;
        width: fit-content;
        height: fit-content;
        font-size: 18px;
    }
}
@media only screen and (min-width: 1070px) {
    .ReservationHeaderBlock {
        color: $deepblue;
        display: flex;
        justify-content: space-between;
        .ReservationInfo {
            margin: 0;
            display: grid;
            &-date {
                padding-top: 17px;
                font-family: $playfair-font;
                font-size: 35px;
            }
            &-hours {
                text-align: right;
                font-size: 20px;
            }
        }
    }
}
</style>