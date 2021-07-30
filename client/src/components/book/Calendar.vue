<template>
    <div class="cat h-fit-content overflow-hidden relative user-select-none">
        <div class="cat__header">
            <div class="month flex content-center align-center">
                <svg class="leftArrow h-p" @click="getMonthDecrease()">
                    <use href="#calendarArrow" />
                </svg>
                <div class="month-name flex content-center align-center text-center">{{ months[calendarData.month] }}</div>
                <svg class="h-p" @click="getMonthIncrease()">
                    <use href="#calendarArrow" />
                </svg>
            </div>
            <div class="weekdays flex align-center">
                <div class="align-center text-center">Mon</div>
                <div class="align-center text-center">Tue</div>
                <div class="align-center text-center">Wed</div>
                <div class="align-center text-center">Thu</div>
                <div class="align-center text-center">Fri</div>
                <div class="align-center text-center">Sat</div>
                <div class="align-center text-center">Sun</div>
            </div>
        </div>
        <ChooseHoursMenu ref="chooseHours" :key="componentKey" />

        <CalendarDays :key="componentKey" />
    </div>
    <Reservation v-if="calendarData.isReservation" />
</template>

<script>
import ChooseHoursMenu from "./chooseHoursMenu.vue";
import CalendarDays from "./calendarDays.vue";
import Reservation from "../Reservation.vue";

import axios from "axios";

(Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}),
    false;

export default {
    name: "Calendar",
    components: {
        ChooseHoursMenu,
        CalendarDays,
        Reservation,
    },
    data() {
        return {
            months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
            componentKey: 0,

            calendarData: {
                month: new Date().getMonth(),
                currentMonth: new Date().getMonth(),
                year: new Date().getFullYear(),
                yearLoop: 0,
                time: String,
                date: "1",
                secondDate: 0,
                hours: Number,

                reservedArray: [],

                isReservation: false,
                openedHidden: true,
                chooseHoursHidden: true,
                row: 1,
                hiddenStyles: {
                    opacity: "0",
                    height: "",
                },
            },
        };
    },
    provide() {
        return {
            calendarData: this.calendarData,
        };
    },
    methods: {
        async insertMenu(row = this.row) {
            this.calendarData.reservedArray = [];
            console.log(encodeURI(this.calendarData.date));
            const response = await axios.get("api/reservationItems/" + encodeURI(this.calendarData.date));
            for (let i = 0; i < Object.keys(response.data).length; i++) {
                let time = response.data[i].time;
                this.calendarData.reservedArray[i] = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
            }
            this.row = row;

            document.getElementsByClassName("choose")[0].appendAfter(document.getElementsByClassName(`${row}row`)[0]);
            setTimeout(
                function () {
                    this.calendarData.chooseHoursHidden = false;
                }.bind(this),
                1
            );
        },
        insertSelect(txt) {
            document.getElementsByClassName("opened")[0].appendAfter(document.getElementsByClassName(`${this.row}row`)[0]);
            document.getElementsByClassName("pa")[0].textContent = txt + " Hodina";
            setTimeout(
                function () {
                    this.calendarData.openedHidden = false;
                }.bind(this),
                1
            );
        },
        removeSelect() {
            this.calendarData.openedHidden = true;
        },
        removeMenu() {
            this.calendarData.chooseHoursHidden = true;
        },
        getMonthDecrease() {
            this.calendarData.openedHidden = true;
            this.calendarData.chooseHoursHidden = true;
            this.calendarData.secondDate = 0;
            if (this.calendarData.month == this.calendarData.currentMonth && this.calendarData.yearLoop == 0) {
                return;
            } else if (this.calendarData.month == 0 && this.calendarData.yearLoop == 1) {
                this.calendarData.month = 11;
                this.calendarData.yearLoop = 0;
                return this.calendarData.month, (this.componentKey = !this.componentKey);
            } else {
                return this.calendarData.month--, (this.componentKey = !this.componentKey);
            }
        },
        getMonthIncrease() {
            this.calendarData.openedHidden = true;
            this.calendarData.chooseHoursHidden = true;
            this.calendarData.secondDate = 0;
            if (this.calendarData.month == this.calendarData.currentMonth && this.calendarData.yearLoop == 1) {
                return this.calendarData.month;
            } else if (this.calendarData.month == 11 && this.calendarData.yearLoop == 0) {
                this.calendarData.month = 0;
                this.calendarData.yearLoop = 1;
                return this.calendarData.month, (this.componentKey = !this.componentKey);
            } else {
                return this.calendarData.month++, (this.componentKey = !this.componentKey);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.cat {
    border-radius: 1.875rem;
    width: 19.6875rem;
    font-size: 0.5625rem;
    .cat__header {
        background: $darkdarkblue;
        width: 100%;
        .month {
            width: 100%;
            height: 2.875rem;
            .leftArrow {
                padding-top: 0;
                transform: rotate(180deg);
            }
            svg {
                width: 2.25rem;
                height: 2.25rem;
                stroke: $beige;
            }
            .month-name {
                width: 11.25rem;
                font-family: Playfair Display;
                font-size: 1.4375rem;
                line-height: 2.9375rem;
                letter-spacing: -0.03rem;
            }
        }
        .weekdays {
            color: $beige;
            height: 1.875rem;
            div {
                width: 4.1875rem;
            }
        }
    }
    .grid-hiderows {
        grid-template-rows: var(--calendarGrid);
    }
}
@media only screen and (min-width: $sm-breakpoint) {
    .cat {
        position: absolute;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .cat {
        height: fit-content;
        overflow: hidden;
        user-select: none;
        border-radius: 1.875rem;
        width: 29.375rem;
        font-size: $font-20;
        .cat__header {
            background: $darkdarkblue;
            width: 100%;
            height: 6.25rem;
            .month {
                width: 100%;
                height: 4.375rem;
                display: flex;
                justify-content: center;
                .leftArrow {
                    padding-top: 0;
                    padding-bottom: 0.5rem;
                    transform: rotate(180deg);
                }
                svg {
                    padding-top: 0.5rem;
                    width: 3.375rem;
                    height: 3.375rem;
                    stroke: $beige;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .month-name {
                    width: 16.875rem;
                    font-family: Playfair Display;
                    font-size: $font-35;
                    line-height: 2.9375rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    letter-spacing: -0.03rem;

                    color: #f5f2ef;
                }
            }
            .weekdays {
                display: flex;
                justify-content: space-between;
                color: $beige;
                div {
                    width: 4.1875rem;
                    height: 1.875rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            }
        }
        .grid-hiderows {
            grid-template-rows: var(--calendarGrid);
        }
    }
}
</style>