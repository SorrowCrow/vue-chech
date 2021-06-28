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
                        <div class="timeframe" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()">
                            {{ index + 7 + (index - 1) * 2 }}:00-{{ index + 8 + (index - 1) * 2 }}:{{ counter * 3 }}0
                            <div class="rezervaceButton">Rezervace</div>
                        </div>
                        <div class="timeframe" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()">
                            {{ index + 6 + index * 2 }}:{{ counter * 3 }}0-{{ index + 8 + index * 2 }}:00
                            <div class="rezervaceButton">Rezervace</div>
                        </div>
                    </div>
                    <div class="timeframe" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()" v-if="evenBool">
                        {{ 6 + numb }}:00-{{ 7 + numb }}:{{ counter * 3 }}0
                        <div class="rezervaceButton">Rezervace</div>
                    </div>
                </div>
            </div>
            <div class="opened__inner-timeframes" v-else-if="threeHoursBool">
                <div class="timeframe" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()" v-for="index in evenNumbers" :key="index">
                    {{ (index - 1) * 3 + 8 }}:00-{{ (index - 1) * 3 + 8 + indexHour }}:00
                    <div class="rezervaceButton">Rezervace</div>
                </div>
            </div>
            <div class="opened__inner-timeframes" v-else>
                <div class="timeframe" @click="timeframeClick($event), ($parent.$parent.isReservation = true), $parent.$parent.removeSelect()" v-for="index in evenNumbers" :key="index">
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
    mounted: function () {
        if (this.$parent.canBeVisible) {
            this.$parent.$parent.removeMenu();
            this.$parent.$parent.insertSelect(this.indexHour);
        }
    },
    data() {
        return {
            counter: 1,
            evenBool: false,
        };
    },
    methods: {
        timeframeClick: function (e) {
            const element = e.target;
            console.log(element);
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
</style>