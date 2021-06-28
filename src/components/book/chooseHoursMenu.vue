<template>
    <div class="hidden choose">
        <div class="hours">
            <span class="hoursButton" @click="(indexHour = 1), (halfBool = false), (threeHoursBool = false), (componentRefresh = !componentRefresh), (canBeVisible = true)">1 Hodina</span>
            <span class="hoursButton" @click="(indexHour = 1.5), (halfBool = true), (threeHoursBool = false), (componentRefresh = !componentRefresh), (canBeVisible = true)">1.5 Hodina</span>
            <span class="hoursButton" @click="(indexHour = 2), (halfBool = false), (threeHoursBool = false), (componentRefresh = !componentRefresh), (canBeVisible = true)">2 Hodina</span>
            <span class="hoursButton" @click="(indexHour = 3), (halfBool = false), (threeHoursBool = true), (componentRefresh = !componentRefresh), (canBeVisible = true)">3 Hodina</span>
        </div>
    </div>
    <SelectMenu :key="componentRefresh" :indexHour="indexHour" :halfBool="halfBool" :numb="14" :threeHoursBool="threeHoursBool" />
</template>

<script>
import SelectMenu from "./selectMenu.vue";

export default {
    name: "chooseHoursMenu",
    components: {
        SelectMenu,
    },
    data() {
        return {
            indexHour: 1,
            halfBool: false,
            threeHoursBool: false,
            componentRefresh: 0,

            canBeVisible: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.choose {
    position: relative;
    margin: auto;
    width: 100%;
    background-color: $medium-beige;
    display: grid;
    border-radius: 30px;
    z-index: 10;
    font-size: 15px;
    .hours {
        display: grid;
        margin: 25px;
        background: $darkdarkblue;
        border-radius: 25px;
        span {
            display: flex;
            align-items: center;
            background: $darkdarkblue;
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
@media only screen and (min-width: $md-breakpoint) {
    .choose {
        font-size: 20px;
    }
}
</style>