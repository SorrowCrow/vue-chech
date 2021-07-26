<template>
    <div class="grid mx-auto ReservationHeaderBlock">
        <svg v-if="isMd" class="ReservationHeaderBlock-icon">
            <image href="../../../public/icon.svg" class="ReservationHeaderBlock-icon" />
        </svg>
        <div class="title min-content">Rezervace</div>
        <div class="ReservationInfo flex h-fit-content">
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
    padding-right: 30px;
    padding-left: 30px;
    max-width: 769px;
    &-icon {
        width: 50px;
        height: 60px;
        margin-bottom: 38px;
    }
    .ReservationInfo {
        margin-top: 7px;
        font-size: 18px;
    }
}
@media only screen and (min-width: 1070px) {
    .ReservationHeaderBlock {
        color: $deepblue;
        display: flex !important;
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