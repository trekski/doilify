<template>
  <div
    id="toolbars_wrapper"
    class="wrapper"
  >
    <SvgIcons style="display: none" />
    <EditToolbar />
  </div>
</template>

<script>
import EditToolbar from '../components/toolbars/EditToolbar.vue'
import SvgIcons from '../components/gui_elements/IconSprites.vue'

export default {
  name: 'GUITets',
  components: {
    EditToolbar: EditToolbar,
    SvgIcons: SvgIcons
  }
}
</script>

<style>
html, body
{
    height: 100%;
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
}

#app {
  margin: 0px;
  padding: 0px;
  height: 100%;
}

.wrapper {
  border: green solid 1px;
  position: relative;
  outline-offset: -1px;
  height: 100%;
}
</style>
