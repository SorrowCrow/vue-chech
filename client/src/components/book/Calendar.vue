<template>
    <div class="cat">
        <div class="cat__header">
            <div class="month">
                <svg class="leftArrow" @click="getMonthDecrease()">
                    <use xlink:href="#calendarArrow" />
                </svg>
                <div class="month-name">{{ months[month] }}</div>
                <svg @click="getMonthIncrease()">
                    <use xlink:href="#calendarArrow" />
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
        <ChooseHoursMenu :key="componentKey" />

        <CalendarDays :key="componentKey" :month="month" :currentMonth="currentMonth" :year="year" :yearLoop="yearLoop" />
    </div>
    <Reservation :key="time" v-if="isReservation" :time="time" :date="date" :hours="hours" />
</template>

<script>
import ChooseHoursMenu from "./chooseHoursMenu.vue";
import CalendarDays from "./calendarDays.vue";
import Reservation from "../Reservation.vue";

import $ from "jquery";
import "jqueryui";
import axios from "axios";

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

            secondDate: 0,

            row: 1,

            isReservation: false,
            time: String,
            date: "1",
            hours: Number,

            response: null,
            reservedArray: [[]],
        };
    },
    methods: {
        async insertMenu(row) {
            this.reservedArray = [];
            this.response = await axios.get("api/bucketListItems/" + this.date);
            // console.log(this.response.data);
            // this.reservedArray = this.response.data;
            for (let i = 0; i < Object.keys(this.response.data).length; i++) {
                let time = this.response.data[i].time;
                this.reservedArray[i] = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
            }
            // console.log(this.reservedArray);
            // for (var item in this.response.data) {
            //     console.log(item);
            // }
            this.row = row;
            var menuId = 0;
            if (this.secondDate < 37) {
                for (let i = this.secondDate; i % 7 != 0; i++) {
                    menuId = i;
                }
            } else {
                for (let i = this.secondDate - 36; i % 7 != 0; i++) {
                    menuId = i;
                }
            }
            if (menuId == 0) {
                menuId = this.secondDate;
            } else {
                menuId++;
            }
            menuId = menuId / 7;
            $(".choose").insertAfter(`.${row}row`);
            $(".choose").removeClass("hidden", 250);
        },
        insertSelect(txt) {
            var menuId = 0;
            if (this.secondDate < 37) {
                for (let i = this.secondDate; i % 7 != 0; i++) {
                    menuId = i;
                }
            } else {
                for (let i = this.secondDate - 36; i % 7 != 0; i++) {
                    menuId = i;
                }
            }
            if (menuId == 0) {
                menuId = this.secondDate;
            } else {
                menuId++;
            }
            menuId = menuId / 7;
            $(".opened").insertAfter(`.${this.row}row`);
            $(".pa").text(txt + " Hodina");
            $(".opened").removeClass("hidden", 250);
        },
        removeSelect() {
            $(".opened").addClass("hidden", 250);
        },
        removeMenu() {
            $(".choose").addClass("hidden", 250);
        },
        getMonthDecrease() {
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
                @include wh(36px, 36px);
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
@media only screen and (min-width: $md-breakpoint) {
    .cat {
        border-radius: 30px;
        width: 470px;
        height: fit-content;
        overflow: hidden;
        position: absolute;
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
                    @include wh(54px, 54px);
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