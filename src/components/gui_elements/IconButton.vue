<template>
  <button class="icon_button">
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
    active: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
.icon_button {
  height: 40px;
  width: 40px;
  overflow: hidden;
}
</style>
