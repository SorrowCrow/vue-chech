<template>
    <div class="cat">
        <div class="cat__header">
            <div class="month">
                <svg class="leftArrow" @click="getMonthDecrease()">
                    <use href="#calendarArrow" />
                </svg>
                <div class="month-name">{{ months[month] }}</div>
                <svg @click="getMonthIncrease()">
                    <use href="#calendarArrow" />
                </svg>
            </div>
            <div class="weekdays">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
        </div>
        <ChooseHoursMenu ref="chooseHours" :secondDate="String(secondDate)" :chooseHoursHidden="chooseHoursHidden" :key="componentKey" :month="month" :currentMonth="currentMonth" :yearLoop="yearLoop" />

        <CalendarDays :key="componentKey" :month="month" :currentMonth="currentMonth" :year="year" :yearLoop="yearLoop" />
    </div>
    <Reservation v-if="isReservation" :time="time" :date="date" :hours="hours" />
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
            month: new Date().getMonth(),
            currentMonth: new Date().getMonth(),
            year: new Date().getFullYear(),
            yearLoop: 0,
            componentKey: 0,

            secondDate: "0",

            row: 1,

            isReservation: false,
            time: String,
            date: "1",
            hours: Number,

            response: null,
            reservedArray: [[]],

            chooseHoursHidden: true,
            openedHidden: true,

            hiddenStyles: {
                opacity: "0",
                height: "",
            },
        };
    },
    methods: {
        async insertMenu(row = this.row) {
            this.reservedArray = [];
            this.response = await axios.get("api/reservationItems/" + this.date);
            for (let i = 0; i < Object.keys(this.response.data).length; i++) {
                let time = this.response.data[i].time;
                this.reservedArray[i] = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
            }
            this.row = row;

            document.getElementsByClassName("choose")[0].appendAfter(document.getElementsByClassName(`${row}row`)[0]);
            setTimeout(
                function () {
                    this.chooseHoursHidden = false;
                }.bind(this),
                1
            );
        },
        insertSelect(txt) {
            document.getElementsByClassName("opened")[0].appendAfter(document.getElementsByClassName(`${this.row}row`)[0]);
            document.getElementsByClassName("pa")[0].textContent = txt + " Hodina";
            setTimeout(
                function () {
                    this.openedHidden = false;
                }.bind(this),
                1
            );
        },
        removeSelect() {
            this.openedHidden = true;
        },
        removeMenu() {
            this.chooseHoursHidden = true;
        },
        getMonthDecrease() {
            this.openedHidden = true;
            this.chooseHoursHidden = true;
            this.secondDate = 0;
            if (this.month == this.currentMonth && this.yearLoop == 0) {
                return;
            } else if (this.month == 0 && this.yearLoop == 1) {
                this.month = 11;
                this.yearLoop = 0;
                return this.month, (this.componentKey = !this.componentKey);
            } else {
                return this.month--, (this.componentKey = !this.componentKey);
            }
        },
        getMonthIncrease() {
            this.openedHidden = true;
            this.chooseHoursHidden = true;
            this.secondDate = 0;
            if (this.month == this.currentMonth && this.yearLoop == 1) {
                return this.month;
            } else if (this.month == 11 && this.yearLoop == 0) {
                this.month = 0;
                this.yearLoop = 1;
                return this.month, (this.componentKey = !this.componentKey);
            } else {
                return this.month++, (this.componentKey = !this.componentKey);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.cat {
    border-radius: 30px;
    width: 315px;
    height: fit-content;
    overflow: hidden;
    position: relative;
    user-select: none;
    font-size: 9px;
    .cat__header {
        background: $darkdarkblue;
        width: 100%;
        .month {
            width: 100%;
            height: 46px;
            display: flex;
            justify-content: center;
            align-items: center;
            .leftArrow {
                padding-top: 0;
                transform: rotate(180deg);
            }
            svg {
                width: 36px;
                height: 36px;
                stroke: $beige;
                &:hover {
                    cursor: pointer;
                }
            }
            .month-name {
                width: 180px;
                font-family: Playfair Display;
                font-size: 23px;
                line-height: 47px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                letter-spacing: -0.03em;

                color: #f5f2ef;
            }
        }
        .weekdays {
            display: flex;
            justify-content: space-between;
            color: $beige;
            div {
                width: 67px;
                height: 30px;
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
@media only screen and (min-width: 740px) {
    .cat {
        position: absolute;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .cat {
        border-radius: 30px;
        width: 470px;
        height: fit-content;
        overflow: hidden;
        user-select: none;
        font-size: 20px;
        .cat__header {
            background: $darkdarkblue;
            width: 100%;
            height: 100px;
            .month {
                width: 100%;
                height: 70px;
                display: flex;
                justify-content: center;
                .leftArrow {
                    padding-top: 0;
                    padding-bottom: 8px;
                    transform: rotate(180deg);
                }
                svg {
                    padding-top: 8px;
                    width: 54px;
                    height: 54px;
                    stroke: $beige;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .month-name {
                    width: 270px;
                    font-family: Playfair Display;
                    font-size: 35px;
                    line-height: 47px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    letter-spacing: -0.03em;

                    color: #f5f2ef;
                }
            }
            .weekdays {
                display: flex;
                justify-content: space-between;
                color: $beige;
                div {
                    width: 67px;
                    height: 30px;
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