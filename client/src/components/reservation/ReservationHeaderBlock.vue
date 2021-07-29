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
    inject: ["windowInfo"],
    props: {
        time: String,
        date: String,
    },
    computed: {
        isMd() {
            return this.windowInfo.size * (this.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) < this.$md ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.ReservationHeaderBlock {
    color: $deepblue;
    padding-right: 1.875rem;
    padding-left: 1.875rem;
    max-width: 48.0625rem;
    &-icon {
        width: 3.125rem;
        height: 3.75rem;
        margin-bottom: 2.375rem;
    }
    .ReservationInfo {
        margin-top: 0.4375rem;
        font-size: 1.125rem;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .ReservationHeaderBlock {
        color: $deepblue;
        display: flex !important;
        justify-content: space-between;
        .ReservationInfo {
            margin: 0;
            display: grid;
            &-date {
                padding-top: 1.0625rem;
                font-family: $playfair-font;
                font-size: 2.1875rem;
            }
            &-hours {
                text-align: right;
                font-size: 1.25rem;
            }
        }
    }
}
</style>