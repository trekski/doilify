<template>
  <button
    class="icon_button"
    :class="{ selected: selected, inactive: inactive }"
  >
    <div v-if="labelText" class="label">
      {{ labelText }}
    </div>
    <div class="icon">
      <svg v-if="iconType == 'svg'" class="svg_icon">
        <use :xlink:href="iconSrc" />
      </svg>
      <div v-if="shortLabel" class="icon_tag">
        {{ shortLabel }}
      </div>
    </div>
  </button>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  labelText: {
    type: String,
    default: "",
  },
  shortLabel: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "svg:svg-icon-default",
  },
  selected: {
    type: Boolean,
    default: false,
  },
  inactive: {
    type: Boolean,
    default: false,
  },
});

const iconType = computed(() => {
  const t = props.icon;
  return t.substring(t, t.search(":"));
});

const iconSrc = computed(() => {
  if (props.icon.startsWith("svg:")) {
    console.log("#" + props.icon.substring(4));
    return "#" + props.icon.substring(4);
  }
  return "";
});

// this line is here only becasue otherwise Dev Servers's hot reload of components throws no-unused-vars on these
console.log(iconType, iconSrc);
</script>

<style>
.icon_button {
  height: 40px;
  min-width: 40px;
  border: none;
  border-radius: 2px;
  padding: 0px;
  background: var(--color-background);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 0px;
}
.icon_button:hover {
  background: var(--color-background-high1);
}
.icon_button.selected {
  background: var(--color-background-high2);
  color: var(--color-main-high);
}
.icon_button.inactive {
  color: rgb(150, 150, 150);
}
.icon {
  display: flex;
  position: relative;
  background-color: inherit;
}
.svg_icon {
  border: none;
  width: 40px;
  height: 40px;
  --color: var(--color-main);
  --color2: var(--color-accent);
}
.inactive .svg_icon {
  --color: var(--color-main-low);
  --color2: var(--color-accent-low);
}
.selected .svg_icon {
  --color: var(--color-main-high);
  --color2: var(--color-accent-high);
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
