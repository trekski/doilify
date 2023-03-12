<template>
  <div id="page_wrapper" class="page_wrapper">
    <SvgIcons style="display: none" />
    <ModalWrapper />
    <EditToolbar />
  </div>
</template>

<script setup>
import SvgIcons from "../components/gui_elements/IconSprites.vue";
import EditToolbar from "../components/toolbars/EditToolbar.vue";
import ModalWrapper from "../components/modal_windows/ModalWrapper.vue";
</script>

<style>
.default_shadow {
  box-shadow: 5px 5px 12px -5px darkgrey;
}
html,
body {
  height: 100%;
  margin: 0px;
  font-family: Arial, Helvetica, sans-serif;
  /* background colors */
  --color-background: whitesmoke; /* default */
  --color-background-high1: rgb(220, 220, 220); /* hover default */
  --color-background-high2: rgb(220, 230, 245); /* selected default */
  /* main color for text and icons */
  --color-main: black; /* default */
  --color-main-high: rgb(40, 95, 170); /* selected */
  --color-main-low: rgb(150, 150, 150); /* inactive */
  /* accent color for icons */
  --color-accent: rgb(30, 80, 140);
  --color-accent-high: rgb(100, 170, 255);
  --color-accent-low: rgb(200, 200, 200);
}
#app {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
.page_wrapper {
  position: relative;
  height: 100vh;
  width: 100vh;
}
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
