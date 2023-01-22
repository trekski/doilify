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
  background: lightgray;
  height: 90%;
  width: 2px;
  border-radius: 1px;
}
</style>
