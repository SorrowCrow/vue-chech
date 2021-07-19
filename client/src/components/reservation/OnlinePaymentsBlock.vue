<template>
    <div class="OnlinePaymentsBlock">
        <div class="OnlinePaymentsBlock__overlay"></div>
        <div class="OnlinePaymentsBlock__wrapper">
            <div class="spin"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OnlinePaymentsBlock",
    data() {
        return {};
    },
    async mounted() {},
};
</script>

<style lang="scss" scoped>
@keyframes spinner {
    0% {
        transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
        transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
}
.spin {
    display: flex;
}
.spin::before {
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px #cfd0d1;
    border-bottom-color: $primary;
    border-radius: 50%;
    content: "";
    height: 40px;
    top: 10%;
    left: 10%;
    transform: translate3d(-50%, -50%, 0);
    width: 40px;
    will-change: transform;
}
.OnlinePaymentsBlock,
.OnlinePaymentsBlock__overlay,
.OnlinePaymentsBlock__wrapper {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.OnlinePaymentsBlock {
    z-index: 150;
    position: fixed;
    width: 100%;
    &__overlay {
        position: absolute;
        background-color: black;
        opacity: 0.5;
    }
    &__wrapper {
        position: absolute;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    // &__payments {
    //     position: relative;
    //     max-width: 1000px;
    //     margin: 100px auto 100px auto;
    //     background: $white;
    //     border-radius: 30px;
    //     position: relative;
    //     z-index: 1;
    //     width: 100%;
    //     padding: 48px 0 0 0;
    //     background: $backgroundgrey;
    // }
}
</style>