<template>
    <div class="white">
        <div class="1row">
            <div class="row">
                <div class="nextMonthDates" v-for="index in firstDay - 1" :key="index" :id="36 + index" v-bind:class="[isSmallerThanToday(36 + index), index == firstDay - 1 ? 'dateOneTop' : '']" @click="dataMonthClick($event, ($parent.row = 1))">
                    {{ index + 1 + (lastMonthDays - firstDay) }}
                </div>
                <div v-for="index in 7 - (firstDay - 1)" :key="index" :id="index" v-bind:class="isSmallerThanToday(index)" @click="dataMonthClick($event, ($parent.row = 1))">
                    {{ index }}
                </div>
            </div>
        </div>
        <div v-for="index in fullweeks()" v-bind:class="(index + 1).toString() + 'row'" :key="index">
            <div class="row">
                <div v-for="bindex in 7" :key="bindex" :id="bindex + 1 - firstDay + 7 * index" v-bind:class="[isSmallerThanToday(bindex + 1 - firstDay + 7 * index)]" @click="dataMonthClick($event, ($parent.row = index + 1))">
                    {{ bindex + 1 - firstDay + 7 * index }}
                </div>
            </div>
        </div>
        <div v-bind:class="(fullweeks() + 2).toString() + 'row'" v-if="!endsOnSundayCheck()">
            <div class="row">
                <div class="days-dates" v-for="index in lastDay" :key="index" :id="index + thisMonthDays - lastDay" v-bind:class="[isSmallerThanToday(index + thisMonthDays - lastDay)]" @click="dataMonthClick($event, ($parent.row = fullweeks() + 2))">
                    {{ index + thisMonthDays - lastDay }}
                </div>
                <div class="days-dates nextMonthDates dateOne" v-for="index in 1" :key="index" :id="thisMonthDays + 1" @click="dataMonthClick($event, ($parent.row = fullweeks() + 2))">
                    {{ index }}
                </div>
                <div class="days-dates nextMonthDates" v-for="index in 7 - lastDay - 1" :key="index" :id="index + thisMonthDays + 1" @click="dataMonthClick($event, ($parent.row = fullweeks() + 2))">
                    {{ index + 1 }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
                    document.getElementsByClassName("secondDateCss")[0].classList.add("firstDateCss");
                }
                element.classList.remove("secondDateCss");

                element.id = this.$parent.secondDate;
                this.$parent.secondDate = 0;
                this.$parent.removeMenu();
                this.$parent.removeSelect();
            } else if (!element.classList.contains("daysGone")) {
                if (this.$parent.secondDate != 0) {
                    document.getElementsByClassName("secondDateCss")[0].id = this.$parent.secondDate;
                    if (this.$parent.secondDate == this.dd) {
                        document.getElementsByClassName("secondDateCss")[0].classList.add("firstDateCss");
                    }
                    document.getElementsByClassName("secondDateCss")[0].classList.remove("secondDateCss");
                    this.$parent.secondDate = 0;
                }
                element.classList.remove("firstDateCss");
                element.classList.add("secondDateCss");

                this.$parent.secondDate = element.id;
                if (element.id > 36) {
                    this.$parent.date = (element.id - 36 + 1 + (this.lastMonthDays - this.firstDay)).toString() + " " + this.months[this.month - 1] + " " + (this.year + this.yearLoop).toString();
                } else if (element.id > 31) {
                    this.$parent.date = (element.id - 31).toString() + " " + this.months[this.month + 1] + " " + (this.year + this.yearLoop).toString();
                } else {
                    this.$parent.date = element.id.toString() + " " + this.months[this.month] + " " + (this.year + this.yearLoop).toString();
                }
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
        isCurrentMonth(month = this.month) {
            return month == this.currentMonth;
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
            } else if (index > 36 && this.isCurrentMonth(this.month - 1) && index - 36 + 1 + (this.lastMonthDays - this.firstDay) < this.dd) {
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
.white {
    background: white;
}
.row {
    display: grid;
    grid-template-columns: repeat(7, 45px);
    grid-auto-rows: 45px;
    .days-dates,
    .daysGone {
        @include wh(45px, 45px);
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $deepblue;
        border-color: $deepblue;
        border-radius: 50%;
        user-select: none;
        font-size: 13px;
        line-height: 150%;
        cursor: pointer;
    }
    .days-dates:hover {
        border: 2px solid;
        width: 36px;
        height: 36px;
    }
    .daysGone {
        color: rgba(0, 0, 0, 0.25);
    }
    .nextMonthDates {
        border-radius: 0px 0px 0px 0px;
        background-color: $medium-beige;
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
        border: 2px solid $orange;
        width: 36px;
        height: 36px;
        color: $orange;
    }
    .secondDateCss {
        border: 2px solid $orange;
        width: 36px;
        height: 36px;
        background-color: $orange;
        color: white;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .row {
        grid-template-columns: repeat(7, 67px);
        grid-auto-rows: 67px;
        .days-dates,
        .daysGone {
            @include wh(61px, 61px);
            font-size: 20px;
            line-height: 150%;
        }
        .days-dates:hover {
            width: 56px;
            height: 56px;
        }
        .nextMonthDates {
            border-radius: 0px 0px 0px 0px;
            background-color: $medium-beige;
            color: rgba(0, 0, 0, 0.25);
            margin: auto;
            width: 100%;
            height: 100%;
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
            border: 2px solid $orange;
            width: 52px;
            height: 52px;
            color: $orange;
        }
        .secondDateCss {
            border: 2px solid $orange;
            width: 52px;
            height: 52px;
            background-color: $orange;
            color: white;
        }
    }
}
</style>