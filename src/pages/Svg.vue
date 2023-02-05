<template>
  <div>
    <SvgIcons style="display: none" />
    <svg style="border: solid 1px red; width: 50px; height: 50px" class="icon">
      <use xlink:href="#svg-icon-test1" />
    </svg>
    <svg style="border: solid 1px red; width: 50px; height: 50px" class="icon2">
      <use xlink:href="#svg-icon-test1" />
    </svg>
    <svg style="border: solid 1px red; width: 50px; height: 50px" class="icon2">
      <use xlink:href="#svg-icon-test2" />
    </svg>
  </div>
</template>

<script>
// import SvgIcons from '../components/svgIcons.vue'
import SvgIcons from "../components/gui_elements/IconSprites.vue";

export default {
  name: "SvgIcons",
  components: {
    SvgIcons: SvgIcons,
  },
};
</script>

<style>
.icon {
  --color: magenta;
  --color2: green;
}
.icon:hover {
  --color: pink;
  --color2: lightgreen;
}
.icon2 {
  --color: blue;
  --color2: gold;
}
.icon2:hover {
  --color: cyan;
  --color2: yellow;
}
</style>
