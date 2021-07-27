<template>
    <div class="Reservation">
        <div class="Reservation__overlay"></div>
        <div class="Reservation__wrapper">
            <div class="Reservation__reservationForm mx-auto">
                <div class="Reservation__reservationForm-exit" @click="bodyDisplayAuto()">
                    <svg viewBox="0 0 23 23">
                        <rect x="3.01471" y="0.893433" width="27" height="3" rx="1.5" transform="rotate(45 3.01471 0.893433)" />
                        <rect x="22.1066" y="3.01477" width="27" height="3" rx="1.5" transform="rotate(135 22.1066 3.01477)" />
                    </svg>
                </div>
                <ReservationHeaderBlock :time="time" :date="date" />
                <div class="Reservation__reservationForm-wrapper">
                    <ReservationFormBlock />
                    <SummaryBlock :key="persons" :time="time" :date="date" :persons="persons" :ozdoba="ozdoba" :prossecco="prossecco" :misa="misa" :hours="hours" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReservationHeaderBlock from "./reservation/ReservationHeaderBlock.vue";
import ReservationFormBlock from "./reservation/ReservationFormBlock.vue";
import SummaryBlock from "./reservation/SummaryBlock.vue";

export default {
    name: "Reservation",
    props: {
        time: String,
        date: String,
        hours: Number,
    },
    data() {
        return {
            persons: 1,
            misa: false,
            prossecco: false,
            ozdoba: false,
            formData: {},
        };
    },
    components: {
        ReservationHeaderBlock,
        ReservationFormBlock,
        SummaryBlock,
    },
    methods: {
        bodyDisplayAuto() {
            this.$parent.isReservation = false;
            document.getElementsByTagName("body")[0].style.overflow = "auto";
        },
    },
    mounted: function () {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        if (this.time.length == 10) {
            this.formData.time = "0" + this.time;
        } else {
            this.formData.time = this.time;
        }
        this.formData.date = this.date;
    },
};
</script>

<style lang="scss" scoped>
.Reservation,
.Reservation__overlay,
.Reservation__wrapper {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.Reservation {
    z-index: 150;
    position: fixed;
    width: 100%;
    &__overlay {
        position: absolute;
        background-color: black;
        opacity: 0.5;
    }
    &__wrapper {
        position: absolute;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    &__reservationForm {
        position: relative;
        z-index: 1;
        width: 100%;
        padding: 48px 0 0 0;
        background: $backgroundgrey;
        &-wrapper {
            overflow: hidden;
        }
        &-exit {
            background-color: $white;
            border-radius: 50%;
            position: absolute;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 30px;
            top: 30px;
            transition: transform 0.25s;
            &:hover {
                cursor: pointer;
                transform: rotate(90deg);
                svg {
                    fill: $orange;
                }
            }
            svg {
                width: 21.1px;
                height: 21.1px;
                fill: $secondary;
            }
        }
    }
}
@media only screen and (min-width: 1070px) {
    .Reservation {
        &__reservationForm {
            position: relative;
            z-index: 1;
            max-width: 1000px;
            margin-top: 100px;
            margin-bottom: 100px;
            background: $white;
            border-radius: 30px;
            &-exit {
                width: 100px;
                height: 100px;
                top: auto;
                right: -30px;
                svg {
                    width: 46.6px;
                    height: 46.6px;
                    fill: $deepblue;
                }
            }
        }
    }
}
</style>