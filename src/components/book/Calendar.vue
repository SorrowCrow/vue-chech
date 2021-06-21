<template>
    <div class="cat">
        <div class="cat__header">
            <div class="month">
                <svg class="leftArrow" @click="getMonthDecrease(), (componentKey = !componentKey)">
                    <use xlink:href="#calendarArrow" />
                </svg>
                <div class="month-name">{{ months[month] }}</div>
                <svg @click="getMonthIncrease(), (componentKey = !componentKey)">
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
        <CalendarDays :key="componentKey" :month="month" :currentMonth="currentMonth" :year="year" :yearLoop="yearLoop" />>
    </div>
</template>

<script>
import ChooseHoursMenu from "./chooseHoursMenu.vue";
import CalendarDays from "./calendarDays.vue";

export default {
    name: "Calendar",
    components: {
        ChooseHoursMenu,
        CalendarDays,
    },
    data() {
        return {
            months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
            month: new Date().getMonth(),
            currentMonth: new Date().getMonth(),
            year: new Date().getFullYear(),
            yearLoop: 0,
            componentKey: 0,
        };
    },
    methods: {
        getMonthDecrease() {
            if (this.month == this.currentMonth && this.yearLoop == 0) {
                return this.month;
            } else if (this.month == 0 && this.yearLoop == 1) {
                this.month = 11;
                this.yearLoop = 0;
                return this.month;
            } else {
                return this.month--;
            }
        },
        getMonthIncrease() {
            if (this.month == this.currentMonth && this.yearLoop == 1) {
                return this.month;
            } else if (this.month == 11 && this.yearLoop == 0) {
                this.month = 0;
                this.yearLoop = 1;
                return this.month;
            } else {
                return this.month++;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.cat {
    border-radius: 30px;
    width: 470px;
    height: fit-content;
    background: white;
    overflow: hidden;
    .cat__header {
        background: #25223e;
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
            color: #d4b8a6;
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
</style>