<template>
    <div class="cat">
        <div class="cat__header">
            <div class="month">
                <svg class="leftArrow">
                    <use xlink:href="#calendarArrow" />
                </svg>
                <div class="month-name">Březen</div>
                <svg>
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
        <ChooseHoursMenu />
        <div class="1row row">
            <div class="days-dates" v-for="index in 7" :key="index" :id="index">
                {{ index }}
            </div>
        </div>

        <div class="2row row">
            <div class="days-dates" v-for="index in 7" :key="index" :id="index + 7">
                {{ index + 7 }}
            </div>
        </div>

        <div class="3row row">
            <div class="days-dates" v-for="index in 7" :key="index" :id="index + 14">
                {{ index + 14 }}
            </div>
        </div>

        <div class="4row row">
            <div class="days-dates" v-for="index in 7" :key="index" :id="index + 21">
                {{ index + 21 }}
            </div>
        </div>

        <div class="5row row">
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
    </div>
</template>

<script>
import $ from "jquery";
import "jqueryui";
import ChooseHoursMenu from "./chooseHoursMenu.vue";

var firstDate = 0;
var secondDate = 0;

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
    console.log(menuId);
    console.log(`#${menuId.toString()}row`);
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
    console.log(menuId);
    console.log(`#${menuId.toString()}row`);
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
var dd = String(today.getDate()).padStart(2, "0");
dd = Number(dd);

console.log(dd);

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
        if (this.id >= dd) {
            $(this).on("click", function () {
                if (this.id != "secondDate" && firstDate == 0 && (secondDate > this.id || secondDate == 0)) {
                    $(this).addClass("firstDateCss");
                    if (secondDate != 0) {
                        insertMenu();
                    }
                    firstDate = this.id;
                    this.id = "firstDate";
                    removeSelect();
                } else if (this.id != "firstDate" && secondDate == 0 && (firstDate < this.id || firstDate == 0)) {
                    $(this).addClass("secondDateCss");

                    secondDate = this.id;
                    this.id = "secondDate";
                    removeSelect();
                    insertMenu();
                } else if (this.id == "firstDate") {
                    $(this).removeClass("firstDateCss");
                    removeSelect();
                    removeMenu();

                    this.id = firstDate;
                    firstDate = 0;
                } else if (this.id == "secondDate") {
                    $(this).removeClass("secondDateCss");

                    this.id = secondDate;
                    secondDate = 0;
                    removeMenu();
                    removeSelect();
                }
                // Blakk magikk
                else if (this.id < secondDate) {
                    $("#firstDate").removeClass("firstDateCss");
                    $("#firstDate").attr("id", `${firstDate.toString()}`);

                    $(this).addClass("firstDateCss");

                    firstDate = this.id;
                    this.id = "firstDate";
                }
                // Blakk magikk
                else if (this.id > secondDate && secondDate != 0) {
                    $("#secondDate").removeClass("secondDateCss");
                    $("#secondDate").attr("id", `${secondDate.toString()}`);

                    $(this).addClass("secondDateCss");

                    secondDate = this.id;
                    this.id = "secondDate";
                    // removeMenu(); maybe later??
                    insertMenu();
                    removeSelect();
                }
            });
        } else {
            $(this).removeClass("days-dates");
            $(this).addClass("daysGone");
        }
    });
});

export default {
    name: "Calendar",
    components: {
        ChooseHoursMenu,
    },
    data() {
        return {
            indexHour: 1,
            halfBool: false,
            threeHoursBool: false,
        };
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
    .row {
        display: grid;
        grid-template-columns: repeat(7, 67px);
        grid-auto-rows: 67px;
        transition: 1000;
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
        }
        .days-dates:hover {
            cursor: pointer;
            border: 2px solid;
            border-radius: 50%;
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
            width: 60px;
            height: 60px;
            color: #ff7a00;
        }
        .secondDateCss {
            border: 1px solid #ff7a00;
            width: 61px;
            height: 61px;
            background-color: #ff7a00;
            color: white;
        }
    }
}
</style>