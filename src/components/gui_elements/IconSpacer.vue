<template>
  <div class="icon_spacer"></div>
</template>

<script>
export default {
  name: 'IconSpacer',
  props: {
    dir: {
      type: String,
      default: 'row'
    }
  }
}
</script>

<style>
.icon_spacer {
  border: none;
  background: darkslategrey;
  height: 100%;
}
</style>