<template>
  <div
    id="toolbars_wrapper"
    class="wrapper"
  >
    <EditToolbar />
  </div>
</template>

<script>
import EditToolbar from '../components/toolbars/EditToolbar.vue'

export default {
  name: 'GUITets',
  components: {
    EditToolbar: EditToolbar
  }
}
</script>

<style>
html, body
{
    height: 100%;
    margin: 0px;
}

#app {
  border: red solid 1px;
  outline-offset: -1px;
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
