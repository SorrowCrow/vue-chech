<template>
    <div class="choose grid overflow-hidden" :style="chooseHoursHidden ? $parent.hiddenStyles : chooseHoursStyles" ref="chooseHours">
        <div class="hours grid">
            <span class="flex align-center relative h-p" @click="setter(1, false, false)">1 Hodina</span>
            <span class="flex align-center relative h-p" @click="setter(1.5, true, false)">1.5 Hodina</span>
            <span class="flex align-center relative h-p" @click="setter(2, false, false)">2 Hodina</span>
            <span class="flex align-center relative h-p" @click="setter(3, false, true)">3 Hodina</span>
        </div>
    </div>
    <SelectMenu :key="componentRefresh" :secondDate="secondDate" :indexHour="indexHour" :halfBool="halfBool" :workingHours="14" :threeHoursBool="threeHoursBool" :month="month" :currentMonth="currentMonth" :yearLoop="yearLoop" />
</template>
<script>
import SelectMenu from "./selectMenu.vue";

export default {
    name: "chooseHoursMenu",
    components: {
        SelectMenu,
    },
    props: {
        chooseHoursHidden: Boolean,

        month: Number,
        currentMonth: Number,

        yearLoop: Number,

        secondDate: String,
    },
    data() {
        return {
            indexHour: 1,
            halfBool: false,
            threeHoursBool: false,
            componentRefresh: 0,

            canBeVisible: false,
            chooseHoursStyles: {
                opacity: "1",
            },
            height: "",
        };
    },
    methods: {
        setter(indexHour, halfBool, threeHoursBool) {
            this.indexHour = indexHour;
            this.halfBool = halfBool;
            this.threeHoursBool = threeHoursBool;
            this.componentRefresh = !this.componentRefresh;
            this.canBeVisible = true;
        },
        matchHeight() {
            this.$refs.chooseHours.style.height = "auto";
            this.height = this.$refs.chooseHours.clientHeight + "px";
            this.$refs.chooseHours.style.height = "";
            this.chooseHoursStyles["height"] = this.height;
        },
    },
    mounted() {
        this.matchHeight();
    },
};
</script>

<style lang="scss" scoped>
.choose {
    height: 0;

    width: 100%;
    background-color: $medium-beige;
    border-radius: 1.875rem;
    font-size: 0.9375rem;
    transition: $transition;
    .hours {
        margin: 1.5625rem;
        background: $darkdarkblue;
        border-radius: 1.5625rem;
        span {
            background: $darkdarkblue;
            height: 3.125rem;
            border-radius: 1.875rem;
            color: white;
            padding-left: 35px;
            &:hover {
                background: rgba(255, 255, 255, 0.03);
            }
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .choose {
        font-size: 1.25rem;
    }
}
</style>