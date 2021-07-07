<template>
    <div class="hidden opened">
        <div class="opened__inner">
            <div class="opened__inner-select" @click="$parent.$parent.removeSelect(), $parent.$parent.insertMenu()">
                <p class="pa">1 Hodina</p>
                <svg><use xlink:href="#openedArrow" /></svg>
            </div>
            <div v-if="halfBool">
                {{ evenBoolSet() }}
                <div class="opened__inner-timeframes">
                    <div v-for="index in evenNumbers" :key="index">
                        <div :class="checktime(index + 7 + (index - 1) * 2, index + 8 + (index - 1) * 2) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()">
                            {{ index + 7 + (index - 1) * 2 }}:00-{{ index + 8 + (index - 1) * 2 }}:{{ counter * 3 }}0
                            <div class="rezervaceButton">Rezervace</div>
                        </div>
                        <div :class="checktime(index + 6 + index * 2, index + 8 + index * 2) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()">
                            {{ index + 6 + index * 2 }}:{{ counter * 3 }}0-{{ index + 8 + index * 2 }}:00
                            <div class="rezervaceButton">Rezervace</div>
                        </div>
                    </div>
                    <div :class="checktime(6 + numb, 7 + numb) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()" v-if="evenBool">
                        {{ 6 + numb }}:00-{{ 7 + numb }}:{{ counter * 3 }}0
                        <div class="rezervaceButton">Rezervace</div>
                    </div>
                </div>
            </div>
            <div class="opened__inner-timeframes" v-else-if="threeHoursBool">
                <div :class="checktime((index - 1) * 3 + 8, (index - 1) * 3 + 8 + indexHour) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()" v-for="index in evenNumbers" :key="index">
                    {{ (index - 1) * 3 + 8 }}:00-{{ (index - 1) * 3 + 8 + indexHour }}:00
                    <div class="rezervaceButton">Rezervace</div>
                </div>
            </div>
            <div class="opened__inner-timeframes" v-else>
                <div :class="checktime(index + 8, index + 8 + indexHour) ? 'timeframe' : 'timeframeReserved'" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()" v-for="index in evenNumbers" :key="index">
                    {{ index + 8 }}:00-{{ index + 8 + indexHour }}:00
                    <div class="rezervaceButton">Rezervace</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SelectMenu",
    props: {
        indexHour: Number,
        halfBool: Boolean,
        numb: Number,
        threeHoursBool: Boolean,
    },
    mounted: async function () {
        if (this.$parent.canBeVisible) {
            this.$parent.$parent.removeMenu();
            this.$parent.$parent.insertSelect(this.indexHour);
        }
        if (this.halfBool) {
            this.$parent.$parent.hours = 15;
        } else if (this.threeHoursBool) {
            this.$parent.$parent.hours = 3;
        } else {
            this.$parent.$parent.hours = this.indexHour;
        }
    },
    data() {
        return {
            counter: 1,
            evenBool: false,
        };
    },
    methods: {
        checktime(hoursStart, hoursEnd) {
            for (let i = 0; i < this.$parent.$parent.reservedArray.length; i++) {
                if (hoursStart == this.$parent.$parent.reservedArray[i][0]) return false;
                else if (hoursStart > Number(this.$parent.$parent.reservedArray[i][0]) && hoursEnd <= Number(this.$parent.$parent.reservedArray[i][2])) return false;
                else if (hoursStart > Number(this.$parent.$parent.reservedArray[i][0]) && hoursEnd <= Number(this.$parent.$parent.reservedArray[i][2])) return false;
                else if (hoursStart < Number(this.$parent.$parent.reservedArray[i][0]) && hoursEnd <= Number(this.$parent.$parent.reservedArray[i][2]) && hoursEnd > Number(this.$parent.$parent.reservedArray[i][0])) return false;
                else if (hoursStart < Number(this.$parent.$parent.reservedArray[i][2]) && hoursEnd > Number(this.$parent.$parent.reservedArray[i][2])) return false;
                else if (this.$parent.$parent.reservedArray[i][3] == "30" && hoursStart == Number(this.$parent.$parent.reservedArray[i][2]) && !this.halfBool) return false;
                // console.log(hoursEnd);
            }
            return true;
        },
        timeframeClick: function (e) {
            const element = e.target;
            const bloat = element.textContent.toString().split(" ");
            this.$parent.$parent.time = bloat[0];
        },
        evenBoolSet() {
            if ((this.numb - 1) % 3 == 0 || this.numb % 3 == 0) {
                this.evenBool = false;
            } else {
                this.evenBool = true;
            }
        },
    },
    computed: {
        evenNumbers() {
            if (this.halfBool) {
                let i = this.numb;
                if (i % 3 == 0) {
                    return i / 3;
                }
                while (i % 3 != 0) {
                    i--;
                }
                return i / 3;
            }
            if (this.threeHoursBool) {
                let i = this.numb;
                while (i % 3 != 0) {
                    i--;
                }
                return i / 3;
            }
            return [...Array(this.numb)].map((_, i) => i).filter((i) => i % this.indexHour === 0);
        },
    },
};
</script>

<style lang="scss" scoped>
.opened {
    position: relative;
    margin: auto;
    width: 100%;
    // $medium-beige
    background-color: $medium-beige;
    display: grid;
    border-radius: 30px;
    z-index: 10;
    font-size: 15px;

    &__inner {
        margin: 25px;
        &-select {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: $darkdarkblue;
            width: 100%;
            height: 50px;
            border-radius: 30px;
            color: white;
            margin-bottom: 20px;
            .pa {
                position: relative;
                padding-left: 35px;
            }
            svg {
                position: relative;
                width: 24px;
                height: 24px;
                padding-right: 15px;
                stroke: $white;
            }
            &:hover {
                cursor: pointer;
                background: #2a2746;
            }
        }
        &-timeframes {
            .timeframe,
            .timeframeReserved {
                padding-left: 35px;
                padding-right: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 38px;
                color: $deepblue;
                padding-top: 11px;
                padding-bottom: 11px;
                border-radius: 30px;
                &:hover {
                    cursor: pointer;
                    background: #eeebe8;
                }
                .rezervaceButton {
                    display: grid;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    background: $orange;
                    color: white;
                    border-radius: 50px;
                    width: 125px;
                    height: 38px;
                    pointer-events: none;
                }
            }
            .timeframeReserved {
                color: rgba(0, 0, 0, 0.25);
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
        position: relative;
        margin: auto;
        width: 470px;
        // $medium-beige
        background-color: $medium-beige;
        display: grid;
        border-radius: 30px;
        z-index: 10;
        font-size: 20px;
        &__inner {
            margin: 25px;
            &-select {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: $darkdarkblue;
                width: 100%;
                height: 50px;
                border-radius: 30px;
                color: white;
                margin-bottom: 20px;
                .pa {
                    position: relative;
                    padding-left: 35px;
                }
                svg {
                    position: relative;
                    width: 24px;
                    height: 24px;
                    padding-right: 15px;
                }
                &:hover {
                    cursor: pointer;
                    background: #2a2746;
                }
            }
            &-timeframes {
                .timeframe {
                    padding-left: 35px;
                    padding-right: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 38px;
                    color: $deepblue;
                    padding-top: 11px;
                    padding-bottom: 11px;
                    border-radius: 30px;
                    &:hover {
                        cursor: pointer;
                        background: #eeebe8;
                    }
                    .rezervaceButton {
                        display: grid;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                        background: $orange;
                        color: white;
                        border-radius: 50px;
                        width: 125px;
                        height: 38px;
                        pointer-events: none;
                    }
                }
            }
        }
    }
}
</style>