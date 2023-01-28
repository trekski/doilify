<template>
  <button
    class="icon_button"
    :class="{selected: selected, inactive: inactive}"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'IconButton',

  props: {
    name: {
      type: String,
      default: 'button'
    },
    description: {
      type: String,
      default: 'button description'
    },
    short_label: {
      type: String,
      default: 'BUT'
    },
    svg_icon: {
      type: String,
      default: 'sis-default'
    },
    selected: {
      type: Boolean,
      default: false
    },
    inactive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.icon_button {
  height: 40px;
  width: 40px;
  overflow: hidden;
  border: none;
  border-radius: 2px;
  background: whitesmoke;
}
.icon_button:hover {
  background: cornsilk;
}
.icon_button.selected {
  background: cornsilk;
  color: darkgoldenrod
}
.icon_button.inactive {
  background: whitesmoke;
  color: #BBB;
}
</style>
