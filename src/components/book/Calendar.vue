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
        <div class="hidden choose">
            <div class="hours">
                <span class="hoursButton">1 Hodina</span>
                <span class="hoursButton">1.5 Hodina</span>
                <span class="hoursButton">2 Hodina</span>
                <span class="hoursButton">3 Hodina</span>
            </div>
        </div>
        <div class="hidden opened">
            <div class="opened__inner">
                <div class="opened__inner-select">
                    <p class="pa">2 Hodina</p>
                    <svg><use xlink:href="#openedArrow" /></svg>
                </div>
                <div class="opened__inner-timeframes">
                    <div>1 Hodina</div>
                    <div>1.5 Hodina</div>
                    <div>2 Hodina</div>
                    <div>3 Hodina</div>
                </div>
            </div>
        </div>

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
            <div class="days-dates" v-for="index in 7" :key="index" :id="index + 28">
                {{ index + 28 }}
            </div>
        </div>

        <!-- <div class="nextMonthDates">
                <div class="days-dates" v-for="index in 4" :key="index" style="" :id="index + 31">
                    {{ index }}
                </div>
            </div> -->
    </div>
</template>

<script>
import $ from "jquery";
import "jqueryui";

var firstDate = 0;
var secondDate = 0;

var firstDateCss = {
    border: "2px solid #ff7a00",
    width: "60px",
    height: "60px",
    color: "#ff7a00",
};

var secondDateCss = {
    border: "1px solid #ff7a00",
    width: "61px",
    height: "61px",
    "background-color": "#ff7a00",
    color: "white",
};
var noCss = {
    border: "",
    width: "",
    height: "",
    color: "",
    "background-color": "",
};

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
    $(`.choose`).css({
        "grid-row": `${menuId + 1}/${menuId + 5}`,
    });
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
    $(`.opened`).css({
        "grid-row": `${menuId + 1}/${menuId + 7}`,
    });
    // console.log(txt);
    $(".pa").text(txt);
    $(".opened").removeClass("hidden", 250);
};

var removeSelect = function () {
    $(".opened").css({
        "grid-row": "",
    });
    $(".opened").addClass("hidden", 250);
};

var removeMenu = function () {
    $(".choose").css({
        "grid-row": "",
    });
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
        if (Number(this.id) >= dd) {
            $(this).on("click", function () {
                if (this.id != "secondDate" && firstDate == 0 && (secondDate > Number(this.id) || secondDate == 0)) {
                    $(this).css(firstDateCss);

                    firstDate = this.id;
                    this.id = "firstDate";
                }
                // Blakk magikk
                else if (Number(this.id) < secondDate) {
                    $("#firstDate").css(noCss);
                    $("#firstDate").attr("id", `${firstDate.toString()}`);

                    $(this).css(firstDateCss);

                    firstDate = this.id;
                    this.id = "firstDate";
                } else if (
                    this.id != "firstDate" &&
                    secondDate == 0 &&
                    (firstDate < Number(this.id) || firstDate == 0)
                ) {
                    $(this).css(secondDateCss);

                    secondDate = this.id;
                    this.id = "secondDate";
                    removeSelect();
                    insertMenu();
                } else if (this.id == "firstDate") {
                    $(this).css(noCss);

                    this.id = firstDate;
                    firstDate = 0;
                } else if (this.id == "secondDate") {
                    $(this).css(noCss);

                    this.id = secondDate;
                    secondDate = 0;
                    removeMenu();
                    removeSelect();
                }
                // Blakk magikk
                else if (Number(this.id) > secondDate) {
                    $("#secondDate").css(noCss);
                    $("#secondDate").attr("id", `${secondDate.toString()}`);

                    $(this).css(secondDateCss);

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
        .nextMonthDates {
            width: fit-content;
            background-color: #f5f2ef;
            border-radius: 30px 0px 0px 0px;
            display: grid;
            grid-template-columns: repeat(4, 67px);
            div {
                color: rgba(0, 0, 0, 0.25);
            }
        }
        .days-dates,
        .daysGone {
            @include wh(60px, 60px);
            margin: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
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
            width: 60px;
            height: 60px;
        }
        .daysGone {
            color: rgba(0, 0, 0, 0.25);
        }
    }
    .choose {
        position: relative;
        margin: auto;
        width: 470px;
        height: 250px;
        background-color: red;
        display: grid;
        border-radius: 30px;
        z-index: 10;
        .hours {
            display: grid;
            margin: 25px;
            background: #25223e;
            border-radius: 25px;
            span {
                display: flex;
                align-items: center;
                background: #25223e;
                height: 50px;
                border-radius: 30px;
                color: white;
                position: relative;
                padding-left: 35px;
                &:hover {
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.03);
                }
            }
        }
    }
    .opened {
        position: relative;
        margin: auto;
        width: 470px;
        height: 540px;
        // #F5F2EF
        background-color: rgb(255, 79, 79);
        display: grid;
        border-radius: 30px;
        z-index: 10;
        &__inner {
            margin: 25px;
            &-select {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #25223e;
                width: 100%;
                height: 50px;
                border-radius: 30px;
                color: white;
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
                div {
                    margin-left: 35px;
                    margin-right: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 30px;
                    color: #2b3a77;
                    .rezervaceButton {
                    }
                }
            }
        }
    }
    .hidden {
        opacity: 0;
        height: 0;
        overflow: hidden;
        transition-timing-function: linear, step-end;
    }
}
</style>