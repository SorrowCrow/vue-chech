<template>
    <div class="header__wrap mx-auto">
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
                <a href="https://www.google.com/maps/place/Krnská+350,+197+00+Kbely,+Czechia/@50.1286805,14.5498908,19z" target="_blank"
                    >Krnska 350/26, Praha 19700</a
                >
            </div>
            <div class="header__contacts-item">
                <svg>
                    <use xlink:href="#phone" />
                </svg>
                <a href="tel:+420 286 851 738">+420 286 851 738</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeaderMenu",
};
</script>

<style lang="scss" scoped>
</style>