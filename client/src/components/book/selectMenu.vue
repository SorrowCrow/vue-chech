<template>
    <div class="opened grid relative overflow-hidden" :style="calendarData.openedHidden ? calendarData.hiddenStyles : openedStyles" ref="openedRef">
        <div class="opened__inner">
            <div class="opened__inner-select flex content-between align-center h-p" @click="$parent.$parent.removeSelect(), $parent.$parent.insertMenu()">
                <p class="pa relative">1 Hodina</p>
                <svg class="relative"><use href="#openedArrow" /></svg>
            </div>
            <div v-if="halfBool">
                {{ evenBoolSet() }}
                <div class="opened__inner-timeframes">
                    <div v-for="index in evenNumbers" :key="index">
                        <div :class="checktime(index + 7 + (index - 1) * 2, index + 8 + (index - 1) * 2) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event)">
                            {{ index + 7 + (index - 1) * 2 }}:00-{{ index + 8 + (index - 1) * 2 }}:{{ counter * 3 }}0
                            <div class="rezervaceButton flex content-center align-center">Rezervace</div>
                        </div>
                        <div :class="checktime(index + 6 + index * 2, index + 8 + index * 2) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event)">
                            {{ index + 6 + index * 2 }}:{{ counter * 3 }}0-{{ index + 8 + index * 2 }}:00
                            <div class="rezervaceButton flex content-center align-center">Rezervace</div>
                        </div>
                    </div>
                    <div :class="checktime(6 + workingHours, 7 + workingHours) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event)" v-if="evenBool">
                        {{ 6 + workingHours }}:00-{{ 7 + workingHours }}:{{ counter * 3 }}0
                        <div class="rezervaceButton flex content-center align-center">Rezervace</div>
                    </div>
                </div>
            </div>
            <div class="opened__inner-timeframes" v-else-if="threeHoursBool">
                <div :class="checktime((index - 1) * 3 + 8, (index - 1) * 3 + 8 + indexHour) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event)" v-for="index in evenNumbers" :key="index">
                    {{ (index - 1) * 3 + 8 }}:00-{{ (index - 1) * 3 + 8 + indexHour }}:00
                    <div class="rezervaceButton flex content-center align-center">Rezervace</div>
                </div>
            </div>
            <div class="opened__inner-timeframes" v-else>
                <div :class="checktime(index + 8, index + 8 + indexHour) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event)" v-for="index in evenNumbers" :key="index">
                    {{ index + 8 }}:00-{{ index + 8 + indexHour }}:00
                    <div class="rezervaceButton flex content-center align-center">Rezervace</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SelectMenu",
    inject: ["calendarData"],
    props: {
        indexHour: Number,
        halfBool: Boolean,
        workingHours: Number,
        threeHoursBool: Boolean,
    },
    mounted() {
        if (this.$parent.canBeVisible) {
            this.$parent.$parent.removeMenu();
            this.$parent.$parent.insertSelect(this.indexHour);
        }
        if (this.halfBool) {
            this.calendarData.hours = 15;
        } else if (this.threeHoursBool) {
            this.calendarData.hours = 3;
        } else {
            this.calendarData.hours = this.indexHour;
        }
        this.matchHeight();
    },
    data() {
        return {
            counter: 1,
            evenBool: false,

            openedStyles: {
                opacity: "1",
            },
            height: "",
        };
    },
    methods: {
        matchHeight() {
            this.$refs.openedRef.style.height = "auto";
            this.height = this.$refs.openedRef.clientHeight + "px";
            this.$refs.openedRef.style.height = "";
            this.openedStyles["height"] = this.height;
        },
        checktime(hoursStart, hoursEnd, id = 0) {
            let n = new Date().getHours();
            let dd = Number(String(new Date().getDate()).padStart(2, "0"));
            if (hoursStart <= n && dd == this.calendarData.secondDate && (this.calendarData.month === this.calendarData.currentMonth || id != 0) && this.calendarData.yearLoop != 1) {
                if (this.halfBool && hoursStart % 3 === 0) {
                    let n = new Date().getMinutes();
                    if (n < 30) return true;
                }
                return false;
            }
            for (let i = 0; i < this.calendarData.reservedArray.length; i++) {
                if (hoursStart == this.calendarData.reservedArray[i][0]) return false;
                else if (hoursStart > Number(this.calendarData.reservedArray[i][0]) && hoursEnd <= Number(this.calendarData.reservedArray[i][2])) return false;
                else if (hoursStart > Number(this.calendarData.reservedArray[i][0]) && hoursEnd <= Number(this.calendarData.reservedArray[i][2])) return false;
                else if (hoursStart < Number(this.calendarData.reservedArray[i][0]) && hoursEnd <= Number(this.calendarData.reservedArray[i][2]) && hoursEnd > Number(this.calendarData.reservedArray[i][0])) return false;
                else if (hoursStart < Number(this.calendarData.reservedArray[i][2]) && hoursEnd > Number(this.calendarData.reservedArray[i][2])) return false;
                else if (this.calendarData.reservedArray[i][3] == "30" && hoursStart == Number(this.calendarData.reservedArray[i][2]) && !this.halfBool) return false;
            }
            return true;
        },
        timeframeClick: function (e) {
            const element = e.target;
            if (element.classList.contains("timeframe")) {
                const bloat = element.textContent.toString().split(" ");
                this.calendarData.time = bloat[0];
                this.calendarData.isReservation = true;
                this.$parent.$parent.removeSelect();
            }
        },
        evenBoolSet() {
            if ((this.workingHours - 1) % 3 == 0 || this.workingHours % 3 == 0) {
                this.evenBool = false;
            } else {
                this.evenBool = true;
            }
        },
    },
    computed: {
        evenNumbers() {
            if (this.halfBool) {
                let i = this.workingHours;
                if (i % 3 == 0) {
                    return i / 3;
                }
                while (i % 3 != 0) {
                    i--;
                }
                return i / 3;
            }
            if (this.threeHoursBool) {
                let i = this.workingHours;
                while (i % 3 != 0) {
                    i--;
                }
                return i / 3;
            }
            return [...Array(this.workingHours)].map((_, i) => i).filter((i) => i % this.indexHour === 0);
        },
    },
};
</script>

<style lang="scss" scoped>
.opened {
    height: 0;
    background-color: $medium-beige;
    border-radius: 1.875rem;
    font-size: $font-15;
    transition: $transition;
    z-index: 1;
    &__inner {
        margin: 1.5625rem;
        &-select {
            background: $darkdarkblue;
            width: 100%;
            height: 3.125rem;
            border-radius: 1.875rem;
            color: white;
            margin-bottom: 1.25rem;
            &:hover {
                background: #2a2746;
            }
            .pa {
                padding-left: 2.1875rem;
            }
            svg {
                width: 1.5rem;
                height: 1.5rem;
                padding-right: 0.9375rem;
                stroke: $white;
            }
        }
        &-timeframes {
            .timeframe,
            .timeframeReserved {
                padding-left: 2.1875rem;
                padding-right: 0.9375rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 2.375rem;
                color: $deepblue;
                padding-top: 0.6875rem;
                padding-bottom: 0.6875rem;
                border-radius: 1.875rem;
                &:hover {
                    cursor: pointer;
                    background: #eeebe8;
                }
                .rezervaceButton {
                    background: $orange;
                    color: white;
                    border-radius: 3.125rem;
                    width: 7.8125rem;
                    height: 2.375rem;
                    pointer-events: none;
                }
            }
            .timeframeReserved {
                color: rgba(0, 0, 0, 0.25);
                &:hover {
                    cursor: initial;
                    background: initial;
                }
                .rezervaceButton {
                    background: rgba(0, 0, 0, 0.03);
                    color: rgba(0, 0, 0, 0.3);
                }
            }
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .opened {
        font-size: $font-20;
    }
}
</style>