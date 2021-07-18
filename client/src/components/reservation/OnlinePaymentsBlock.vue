<template>
    <div class="OnlinePaymentsBlock">
        <div class="OnlinePaymentsBlock__overlay"></div>
        <div class="OnlinePaymentsBlock__wrapper">
            <div class="OnlinePaymentsBlock__payments">
                <form action="" @submit.prevent="redirect">
                    <label>
                        Card
                        <div id="card-element"></div>
                    </label>
                    <button @click="submit">Pay now!</button>
                </form>
                <!-- <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems" :success-url="successURL" :cancel-url="cancelURL" @loading="(v) => (loading = v)" /> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OnlinePaymentsBlock",
    data() {
        return {
        };
    },
    async mounted() {
    },
    
};
</script>

<style lang="scss" scoped>
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
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    &__payments {
        position: relative;
        max-width: 1000px;
        margin: 100px auto 100px auto;
        background: $white;
        border-radius: 30px;
        position: relative;
        z-index: 1;
        width: 100%;
        padding: 48px 0 0 0;
        background: $backgroundgrey;
    }
}
</style>