<template>
    <svg class="containerWave">
        <use href="#containerWave" />
    </svg>
    <form class="reservationForm" id="form">
        <div class="container">
            <div class="grid">
                <input required type="text" name="firstname" placeholder="Jemno*" />
                <div class="reservationForm__select" @click="$parent.$parent.removeSelect(), $parent.$parent.insertMenu()">
                    <!-- <select class="reservationForm__select-inner" form="form">
                        <option value="1">
                            1 Osoby
                            <p>(+100,- Kč)</p>
                        </option>
                    </select> -->
                    <div class="reservationForm__select-inner" @click="osobyClick()">
                        <div class="pa">
                            {{ $parent.persons }} Osoby
                            <p v-if="$parent.persons > 1">(+{{ $parent.persons - 1 }}00,- Kč)</p>
                        </div>
                        <svg><use href="#openedArrow" /></svg>
                    </div>

                    <div class="reservationForm__select-list">
                        <div @click="($parent.persons = 1), osobyClick()">1 Osoby</div>
                        <div @click="($parent.persons = 2), osobyClick()">
                            2 Osoby
                            <p>(+100,- Kč)</p>
                        </div>
                        <div @click="($parent.persons = 3), osobyClick()">
                            3 Osoby
                            <p>(+200,- Kč)</p>
                        </div>
                        <div @click="($parent.persons = 4), osobyClick()">
                            4 Osoby
                            <p>(+300,- Kč)</p>
                        </div>
                    </div>
                </div>
                <input required type="text" name="phone" placeholder="Telefon*" />
                <input required type="text" name="email" placeholder="E-mail" />
                <textarea
                    type="text"
                    name="message"
                    placeholder="Dalsi pozadavky
Treba jokou chcete hudbu..."
                ></textarea>
            </div>

            <AdditionalComponent :name="'Ozdoba'" :price="350" :infoText="'Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.'" />
            <AdditionalComponent :name="'Prossecco'" :price="290" :infoText="'Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.'" />
            <AdditionalComponent :name="'Ovocna Misa'" :price="350" :infoText="'Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.'" />
        </div>
        <!-- <button  class="pointer">SEND</button> -->
    </form>
</template>

<script>
import AdditionalComponent from "./AdditionalComponent.vue";

export default {
    name: "ReservationFormBlock",
    components: {
        AdditionalComponent,
    },
    methods: {
        osobyClick() {
            if (document.getElementsByClassName("reservationForm__select-list")[0].style.display == "grid") {
                document.getElementsByClassName("reservationForm__select-list")[0].style.display = "none";
            } else {
                document.getElementsByClassName("reservationForm__select-list")[0].style.display = "grid";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.containerWave {
    position: relative;
    width: 100%;
    min-width: 680px;
    height: 22px;
    fill: $backgroundgrey;
    margin-top: 30px;
}
.reservationForm {
    margin-top: -4px;
    padding-bottom: 60px;
    background-color: $backgroundgrey;
    color: $deepblue;
    .container {
        max-width: 769px;
        padding-left: 30px;
        padding-right: 30px;
        margin: 0 auto;
        .grid {
            display: grid;
            grid-template-columns: auto;
            grid-row-gap: 10px;
            p {
                color: $secondary;
            }
        }
    }
    &__select-inner,
    input,
    &__select-list div,
    textarea {
        padding: 0;
        padding-left: 20px;
        padding-right: 13.5px;
        height: 60px;
        font-size: 20px;
        border-radius: 10px;
        font-family: $playfair-font;
        background-color: $white;
        border: 0;
        color: $deepblue;
        appearance: none;
        &::placeholder {
            color: $deepblue;
            opacity: 1;
        }
    }
    &__select {
        max-height: 60px;

        svg {
            width: 28px;
            height: 15px;
            stroke: $secondary;
        }
        &-inner {
            background-color: $white;
            height: 60px;

            display: flex;
            align-items: center;
            justify-content: space-between;
            .pa {
                display: flex;
                align-items: center;
                p {
                    padding-left: 20px;
                }
            }
            &:hover {
                cursor: pointer;
            }
        }
        &-list {
            display: none;
            justify-content: space-between;

            div {
                background-color: white;
                z-index: 1;
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &:hover {
                    cursor: pointer;
                    background-color: $backgroundgrey;
                }
            }
        }
    }
    textarea {
        padding-top: 10px;
        margin-bottom: 30px;
        // grid-column: 1 / -1;
        resize: none;
        height: 135px;
    }
}
@media only screen and (min-width: 1070px) {
    .reservationForm {
        padding-top: 100px;
        padding-bottom: 88px;
        .container {
            .grid {
                display: grid;
                grid-template-columns: auto auto;
                grid-column-gap: 30px;
                grid-row-gap: 30px;
                p {
                    color: $secondary;
                }
            }
        }
        &__select-inner,
        input,
        &__select-list div,
        textarea {
            font-size: 25px;
        }
        textarea {
            margin-bottom: 30px;
            grid-column: 1 / -1;
            resize: none;
            height: 170px;
        }
    }
}
</style>