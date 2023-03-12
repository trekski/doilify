<template>
  <div
      :class="{color_bullet : true, active: active, selected: selected}"
      :style="{'--button-color': color, 'width': (2*radius)+'px', 'height': (2*radius)+'px', 'border-radius': (radius)+'px'}"
      :title="name"
  ></div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  color: {
    type: String,
    default: "red",
  },
  name: {
    type: String,
    default: "some color",
  },
  active: {
    type: Boolean,
    default: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  radius: {
    type: Number,
    default: 20
  }
});
</script>

<style scoped>
.color_bullet {
    background-color: var(--button-color)
}
.color_bullet.selected {
  box-shadow:  0px 0px 0px 2px var(--button-color) , inset 0px 0px 0px 2px white;
}
.color_bullet.active:hover,.color_bullet.selected:hover {
    box-shadow:  0px 0px 0px 5px var(--button-color) , inset 0px 0px 0px 4px white;
}

</style>
