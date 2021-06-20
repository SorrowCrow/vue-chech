<template>
    <header class="header">
        <div class="wrap mx-auto">
            <div class="header__logo">
                <svg class="header__logo-icon">
                    <use xlink:href="#logo" />
                </svg>
                <div class="header__logo-text">Sauna Kbely</div>
            </div>
            <div class="header__contacts">
                <div class="header__contacts-item">
                    <svg>
                        <use xlink:href="#clock" />
                    </svg>
                    <div>08:00—22:00</div>
                </div>
                <div class="header__contacts-item">
                    <svg>
                        <use xlink:href="#location" />
                    </svg>
                    <div>Krnska 350/26, Praha 19700</div>
                </div>
                <div class="header__contacts-item">
                    <svg>
                        <use xlink:href="#phone" />
                    </svg>
                    <div>+420 286 851 738</div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
    position: absolute;
    width: 100%;
    padding-top: 19px;
    z-index: 100;
    .wrap {
        max-width: 1440px;
        color: white;
        display: flex;
        justify-content: space-between;
    }
    &__logo {
        padding-left: 75px;
        display: flex;
        &-icon {
            position: relative;
            float: left;
            padding-right: 20px;
            @include wh(40px, 48px);
        }
        &-text {
            position: relative;
            font-size: 35px;
            line-height: 41px;
            top: 7px;
        }
    }
    &__contacts {
        display: flex;
        justify-content: space-between;
        width: 884px;
        padding-right: 35px;
        div,
        svg {
            position: relative;
        }
        div {
            font-size: 25px;
            line-height: 29px;
        }
        svg {
            float: left;
            padding-top: 2px;
            padding-right: 5px;
            @include wh(25px, 25px);
        }
        &-item {
            display: flex;
            margin-top: 16px;
        }
    }
}
</style>
