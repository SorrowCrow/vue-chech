<template>
    <div class="hidden choose">
        <div class="hours">
            <span class="hoursButton" @click="(indexHour = 1), (halfBool = false), (threeHoursBool = false)">1 Hodina</span>
            <span class="hoursButton" @click="(indexHour = 1.5), (halfBool = true), (threeHoursBool = false)">1.5 Hodina</span>
            <span class="hoursButton" @click="(indexHour = 2), (halfBool = false), (threeHoursBool = false)">2 Hodina</span>
            <span class="hoursButton" @click="(indexHour = 3), (halfBool = false), (threeHoursBool = true)">3 Hodina</span>
        </div>
    </div>
    <SelectMenu :indexHour="indexHour" :halfBool="halfBool" :numb="14" :threeHoursBool="threeHoursBool" />
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
        };
    },
};
</script>

<style lang="scss" scoped>
.choose {
    position: relative;
    margin: auto;
    width: 470px;
    background-color: #f5f2ef;
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
</style>