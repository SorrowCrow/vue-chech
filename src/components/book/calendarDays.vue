<template>
    <div>
        <div v-if="isCurrentMonth()">
            <div v-for="index in 4" v-bind:class="index.toString() + 'row'" :key="index">
                <div class="row">
                    <div class="days-dates" v-for="bindex in 7" :key="bindex" :id="bindex + 7 * (index - 1)">
                        {{ bindex + 7 * (index - 1) }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-for="index in 4" v-bind:class="index.toString() + 'row'" :key="index">
                <div class="row">
                    <div class="days-dates" v-for="bindex in 7" :key="bindex" :id="bindex + 7 * (index - 1)">
                        {{ bindex + 7 * (index - 1) }}
                    </div>
                </div>
            </div>
        </div>

        <div class="5row row" v-if="month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11">
            <div class="days-dates" v-for="index in 3" :key="index" :id="index + 28">
                {{ index + 28 }}
            </div>
            <div class="days-dates nextMonthDates dateOne" v-for="index in 1" :key="index" :id="index + 31">
                {{ index }}
            </div>
            <div class="days-dates nextMonthDates" v-for="index in 3" :key="index" :id="index + 32">
                {{ index + 1 }}
            </div>
        </div>
        <div class="5row row" v-else-if="month == 3 || month == 5 || month == 8 || month == 10">
            <div class="days-dates" v-for="index in 2" :key="index" :id="index + 28">
                {{ index + 28 }}
            </div>
            <div class="days-dates nextMonthDates dateOne" v-for="index in 1" :key="index" :id="index + 30">
                {{ index }}
            </div>
            <div class="days-dates nextMonthDates" v-for="index in 4" :key="index" :id="index + 31">
                {{ index + 1 }}
            </div>
        </div>
        <div class="5row row" v-else-if="month == 1">
            <div class="days-dates" v-for="index in getYear()" :key="index" :id="index + 28">
                {{ index + 28 }}
            </div>
            <div class="days-dates nextMonthDates dateOne" v-for="index in 1" :key="index" :id="index + 28 + getYear()">
                {{ index }}
            </div>
            <div class="days-dates nextMonthDates" v-for="index in 6 + getYear()" :key="index" :id="index + 29 + getYear()">
                {{ index + 1 }}
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
    methods: {
        isCurrentMonth() {
            return this.currentMonth == this.month;
        },
        getYear() {
            if ((this.year + this.yearLoop) % 4 == 0) {
                return 1;
            } else {
                return 0;
            }
        },
        reset() {
            let secondDate = 0;

            var insertMenu = function () {
                var menuId = 0;
                for (let i = secondDate; i % 7 != 0; i++) {
                    menuId = i;
                }
                if (menuId == 0) {
                    menuId = secondDate;
                } else {
                    menuId++;
                }
                menuId = menuId / 7;
                $(".choose").insertAfter(`.${menuId.toString()}row`);
                $(".choose").removeClass("hidden", 250);
            };

            var insertSelect = function (txt) {
                var menuId = 0;
                for (let i = secondDate; i % 7 != 0; i++) {
                    menuId = i;
                }
                if (menuId == 0) {
                    menuId = secondDate;
                } else {
                    menuId++;
                }
                menuId = menuId / 7;
                $(".opened").insertAfter(`.${menuId.toString()}row`);
                $(".pa").text(txt);
                $(".opened").removeClass("hidden", 250);
            };

            var removeSelect = function () {
                $(".opened").addClass("hidden", 250);
            };

            var removeMenu = function () {
                $(".choose").addClass("hidden", 250);
            };

            var today = new Date();
            var dd = Number(String(today.getDate()).padStart(2, "0"));

            let currentMonth = this.isCurrentMonth();
            console.log(currentMonth);
            $(document).ready(function () {
                $(".opened__inner-select").on("click", function () {
                    removeSelect();
                    insertMenu();
                });
                $(".hoursButton").each(function () {
                    $(this).on("click", function () {
                        // console.log($(this).text());
                        removeMenu();
                        insertSelect($(this).text());
                    });
                });
                $(".days-dates").each(function () {
                    if (this.id < dd && currentMonth) {
                        $(`#${dd}`).addClass("firstDateCss");
                        $(this).removeClass("days-dates");
                        $(this).addClass("daysGone");
                    } else {
                        $(this).on("click", function () {
                            if (this.id == "secondDate") {
                                if (secondDate == dd) {
                                    $(".secondDateCss").addClass("firstDateCss");
                                }
                                $(this).removeClass("secondDateCss");

                                this.id = secondDate;
                                secondDate = 0;
                                removeMenu();
                                removeSelect();
                            } else {
                                if (secondDate != 0) {
                                    $(".secondDateCss").attr("id", `${secondDate.toString()}`);
                                    if (secondDate == dd) {
                                        $(".secondDateCss").addClass("firstDateCss");
                                    }
                                    $(".secondDateCss").removeClass("secondDateCss");
                                    secondDate = 0;
                                }
                                $(this).removeClass("firstDateCss");
                                $(this).addClass("secondDateCss");

                                secondDate = this.id;
                                this.id = "secondDate";
                                removeSelect();
                                insertMenu();
                            }
                        });
                    }
                });
            });
        },
    },
    mounted: function () {
        this.reset();
    },
    // watch: {
    //     question() {
    //         this.reset();
    //     },
    // },
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
            width: 63px;
            height: 63px;
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