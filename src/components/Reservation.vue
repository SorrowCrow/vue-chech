<template>
    <div class="Reservation">
        <div class="ReservationOverlay"></div>
        <div class="ReservationForm mx-auto">
            <div class="ReservationExit" @click="$parent.isReservation = false">
                <svg>
                    <use xlink:href="#cross" />
                </svg>
            </div>
            <ReservationHeaderBlock :time="time" :date="date" />
        </div>
    </div>
</template>

<script>
import ReservationHeaderBlock from "./reservation/ReservationHeaderBlock.vue";

export default {
    name: "Reservation",
    props: {
        time: String,
        date: String,
    },
    components: {
        ReservationHeaderBlock,
    },
};
</script>

<style lang="scss">
// body {
//     overflow: hidden;
// }
</style>

<style lang="scss" scoped>
.Reservation {
    z-index: 150;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    right: 0;
}
.ReservationExit {
    background-color: $white;
    border-radius: 50%;
    position: absolute;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -30px;
    transition: transform 0.25s;
    &:hover {
        cursor: pointer;
        transform: rotate(90deg);
        svg {
            fill: $orange;
        }
    }
    svg {
        width: 46.6px;
        height: 46.6px;
        fill: $deepblue;
    }
}
.ReservationOverlay {
    position: absolute;
    overflow-y: scroll;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
}
.ReservationForm {
    position: relative;
    z-index: 1;
    width: clamp(375px, 1000px, 1000px);
    margin-top: 100px;
    padding: 48px 115px 93px 115px;
    background: $white;
    border-radius: 30px;
}
</style>