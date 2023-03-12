<template>
    <ModalWindow
        window-name="pick a color"
        negative = "don't change"
        affirmative = ''
        @negative =  "ReturnColor()"
    >
    <div class="color_table">
        <div
            v-for="(row, i) in allowedColors"
            :key="i" 
            class="color_row" 
        >
            <ColorBullet
                v-for="(item, j) in row"
                :key="j"
                :color="item.color"
                :name="item.name"
                :selected ="item.color == defaultColor"
                @click="ReturnColor(item.color)"
            />
        </div>
    </div>
    </ModalWindow>
</template>

<script setup>
    import { defineEmits } from "vue"
    import { defineProps } from "vue";
    import ModalWindow from "../gui_elements/ModalWindow.vue"
    import ColorBullet from "../gui_elements/ColorBullet.vue"

    defineProps({
        defaultColor: {
            type: String,
            default: "black",
        }
    })

    const allowedColors = [
        [
            { color: "black", name: "black" },
            { color: "dimgray", name: "dark gray" },
            { color: "darkgray", name: "light gray" },
        ],
        [
            { color: "dodgerblue", name: "blue" },
            { color: "crimson", name: "red" },
            { color: "gold", name: "yello" },
        ],
        [
            { color: "#ff9900", name: "orange" },
            { color: "forestgreen", name: "green" },
            { color: "mediumorchid", name: "purple" },
        ],
    ]
    
    const emit = defineEmits(['modalReturn']);

    function ReturnColor (color = '') {
        if (color === '') {
            emit('modalReturn', {'status' : false})
        } else {
            emit('modalReturn', {'status' : true, 'payload': color})
        }
    }

</script>

<style scoped>
.color_table {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 15px;
}
.color_row {
    display: flex;
    column-gap: 15px;
}
</style>
