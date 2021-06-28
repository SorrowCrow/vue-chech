<template>
    <div class="ReservationHeaderBlock">
        <div class="title">Rezervace</div>
        <div class="ReservationInfo">
            <div class="ReservationInfo-date">{{ date }}</div>
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
};
</script>

<style lang="scss" scoped>
.ReservationHeaderBlock {
    color: $deepblue;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
        width: min-content;
    }
    .ReservationInfo {
        width: fit-content;
        display: grid;
        height: fit-content;
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
</style>