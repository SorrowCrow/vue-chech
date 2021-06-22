<template>
    <div class="white">
        <div class="1row">
            <div class="row">
                <div
                    class="nextMonthDates"
                    v-for="index in firstDay - 1"
                    :key="index"
                    :id="36 + index"
                    v-bind:class="[isSmallerThanToday(36 + index), index == firstDay - 1 ? 'dateOneTop' : '']"
                    @click="dataMonthClick($event, ($parent.row = 1))"
                >
                    {{ index + 1 + (lastMonthDays - firstDay) }}
                </div>
                <div
                    v-for="index in 7 - (firstDay - 1)"
                    :key="index"
                    :id="index"
                    v-bind:class="isSmallerThanToday(index)"
                    @click="dataMonthClick($event, ($parent.row = 1))"
                >
                    {{ index }}
                </div>
            </div>
        </div>
        <div v-for="index in fullweeks()" v-bind:class="(index + 1).toString() + 'row'" :key="index">
            <div class="row">
                <div
                    v-for="bindex in 7"
                    :key="bindex"
                    :id="bindex + 1 - firstDay + 7 * index"
                    v-bind:class="[isSmallerThanToday(bindex + 1 - firstDay + 7 * index)]"
                    @click="dataMonthClick($event, ($parent.row = index + 1))"
                >
                    {{ bindex + 1 - firstDay + 7 * index }}
                </div>
            </div>
        </div>
        <div v-bind:class="(fullweeks() + 2).toString() + 'row'" v-if="!endsOnSundayCheck()">
            <div class="row">
                <div
                    class="days-dates"
                    v-for="index in lastDay"
                    :key="index"
                    :id="index + thisMonthDays - lastDay"
                    @click="dataMonthClick($event, ($parent.row = fullweeks() + 2))"
                >
                    {{ index + thisMonthDays - lastDay }}
                </div>
                <div
                    class="days-dates nextMonthDates dateOne"
                    v-for="index in 1"
                    :key="index"
                    :id="thisMonthDays + 1"
                    @click="dataMonthClick($event, ($parent.row = fullweeks() + 2))"
                >
                    {{ index }}
                </div>
                <div
                    class="days-dates nextMonthDates"
                    v-for="index in 7 - lastDay - 1"
                    :key="index"
                    :id="index + thisMonthDays + 1"
                    @click="dataMonthClick($event, ($parent.row = fullweeks() + 2))"
                >
                    {{ index + 1 }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import "jqueryui";

export default {
    name: "calendarDays",

    props: {
        month: Number,
        currentMonth: Number,

        year: Number,
        yearLoop: Number,
    },
    data() {
        return {
            firstDay: new Date(),
            lastDay: new Date(),
            lastMonthDays: new Date(),
            thisMonthDays: new Date(),
            secondDate: 0,
            dd: Number(String(new Date().getDate()).padStart(2, "0")),
        };
    },
    created: function () {
        if (this.firstDay == 0) {
            this.firstDay = 7;
        }
        if (this.lastDay == 0) {
            this.lastDay = 7;
        }
        this.setFirstDay();
        this.setLastDay();
        this.setlastMonthDays();
        this.setthisMonthDays();
    },
    mounted: function () {
        if (this.firstDay == 0) {
            this.firstDay = 7;
        }
        if (this.lastDay == 0) {
            this.lastDay = 7;
        }
        this.setFirstDay();
        this.setLastDay();
        this.setlastMonthDays();
        this.setthisMonthDays();
    },
    methods: {
        endsOnSundayCheck() {
            if (this.lastDay == 7) return true;
            else return false;
        },
        dataMonthClick: function (e, row) {
            const element = e.target;
            if (element.id == "secondDate") {
                if (this.$parent.secondDate == this.dd && this.isCurrentMonth() && this.isCurrentYear()) {
                    $(".secondDateCss").addClass("firstDateCss");
                }
                $(element).removeClass("secondDateCss");

                element.id = this.$parent.secondDate;
                this.$parent.secondDate = 0;
                this.$parent.removeMenu();
                this.$parent.removeSelect();
            } else if (!element.classList.contains("daysGone")) {
                if (this.$parent.secondDate != 0) {
                    $(".secondDateCss").attr("id", `${this.$parent.secondDate.toString()}`);
                    if (this.$parent.secondDate == this.dd) {
                        $(".secondDateCss").addClass("firstDateCss");
                    }
                    $(".secondDateCss").removeClass("secondDateCss");
                    this.$parent.secondDate = 0;
                }
                $(element).removeClass("firstDateCss");
                $(element).addClass("secondDateCss");

                this.$parent.secondDate = element.id;
                element.id = "secondDate";
                this.$parent.removeSelect();
                this.$parent.insertMenu(row);
            }
        },
        isToday(day) {
            return day == this.dd;
        },
        setSecondDate(date) {
            this.$parent.secondDate = date;
        },
        getSecondDate() {
            return this.$parent.secondDate;
        },
        fullweeks() {
            if (this.firstDay > 4) {
                return 4;
            } else {
                return 3;
            }
        },
        setFirstDay() {
            this.firstDay = new Date(new Date().getFullYear(), this.month, 1).getDay();
            if (this.firstDay == 0) {
                this.firstDay = 7;
            }
        },
        setLastDay() {
            this.lastDay = new Date(new Date().getFullYear(), this.month + 1, 0).getDay();
            if (this.lastDay == 0) {
                this.lastDay = 7;
            }
        },
        setlastMonthDays() {
            this.lastMonthDays = new Date(new Date().getFullYear(), this.month, 0).getDate();
        },
        setthisMonthDays() {
            this.thisMonthDays = new Date(new Date().getFullYear(), this.month + 1, 0).getDate();
        },
        isCurrentMonth() {
            return this.currentMonth == this.month;
        },
        isCurrentYear() {
            return this.year + this.yearLoop == this.year;
        },
        getYear() {
            if ((this.year + this.yearLoop) % 4 == 0) {
                return 1;
            } else {
                return 0;
            }
        },
        isSmallerThanToday(index) {
            if ((index < this.dd || index > 36) && this.isCurrentMonth() && this.isCurrentYear()) {
                return "daysGone";
            } else {
                if (this.isToday(index) && this.isCurrentMonth() && this.isCurrentYear()) {
                    return ["days-dates", "firstDateCss"];
                }
                return "days-dates";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.row {
    display: grid;
    grid-template-columns: repeat(7, 67px);
    grid-auto-rows: 67px;
    .days-dates,
    .daysGone {
        @include wh(61px, 61px);
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #2b3a77;
        border-color: #2b3a77;
        border-radius: 50%;
        user-select: none;
        font-size: 20px;
        line-height: 150%;
        cursor: pointer;
    }
    .days-dates:hover {
        border: 2px solid;
        width: 56px;
        height: 56px;
    }
    .daysGone {
        color: rgba(0, 0, 0, 0.25);
    }
    .nextMonthDates {
        border-radius: 0px 0px 0px 0px;
        background-color: #f5f2ef;
        color: rgba(0, 0, 0, 0.25);
        margin: auto;
        width: 100%;
        height: 100%;
        &:hover {
            margin: auto;
            cursor: pointer;
            border-radius: 0px 0px 0px 0px;
        }
    }
    .dateOne {
        border-radius: 30px 0px 0px 0px;
        &:hover {
            border-radius: 30px 0px 0px 0px;
        }
    }
    .dateOneTop {
        border-radius: 0px 0px 30px 0px;
        &:hover {
            border-radius: 0px 0px 30px 0px;
        }
    }
    .firstDateCss {
        border: 2px solid #ff7a00;
        width: 52px;
        height: 52px;
        color: #ff7a00;
    }
    .secondDateCss {
        border: 2px solid #ff7a00;
        width: 52px;
        height: 52px;
        background-color: #ff7a00;
        color: white;
    }
}
</style>