<template>
  <button
    class="icon_button"
    :class="{selected: selected, inactive: inactive}"
  >
    <div v-if="labelText" class="label">
      {{ labelText }}
    </div>
    <div class="icon">
      <svg
        v-if="iconType == 'svg'"
        class="svg_icon"
      >
        <use :xlink:href="iconSrc" />
      </svg>
      <div v-if="shortLabel" class="icon_tag">
        {{ shortLabel }}
      </div>
    </div>
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  labelText: {
    type: String,
    default: ''
  },
  shortLabel: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'svg:svg-icon-default'
  },
  selected: {
    type: Boolean,
    default: false
  },
  inactive: {
    type: Boolean,
    default: false
  }
})

const iconType = computed(() => {
  const t = props.icon
  return t.substring(t, t.search(':'))
})

const iconSrc = computed(() => {
  if (props.icon.startsWith('svg:')) {
    console.log('#' + props.icon.substring(4))
    return '#' + props.icon.substring(4)
  }
  return ''
})

// this line is here only becasue otherwise Dev Servers's hot reload of components throws no-unused-vars on these
console.log(iconType, iconSrc)

</script>

<style>
.icon_button {
  height: 40px;
  min-width: 40px;
  border: none;
  border-radius: 2px;
  padding: 0px;
  background: whitesmoke;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 0px;
}
.icon_button:hover {
  background: rgb(220,220,220);
}
.icon_button.selected {
  background: rgb(220,220,220);
  color: rgb(40, 80, 170);
}
.icon_button.selected:hover {
  background: rgb(220,230,245);
}
.icon_button.inactive {
  background: whitesmoke;
  color: rgb(150, 150, 150);
}
.icon{
  display: flex;
  position: relative;
  background-color: inherit;
}
.svg_icon {
  border: none;
  width: 40px;
  height: 40px;
  --color: black;
  --color2: rgb(30, 80, 140);;
}
.inactive .svg_icon {
  --color: rgb(150, 150, 150);
  --color2: rgb(200, 200, 200);
}
.selected .svg_icon {
  --color: rgb(40, 95, 170);
  --color2: rgb(100, 170, 255);
}
.label {
  padding: 0px 5px;
}
.icon_tag {
  position: absolute;
  right: 0px;
  bottom: 0px;
  font-size: 60%;
  font-weight: bold;
  padding: 1px;
  background-color: inherit;
}
</style>
