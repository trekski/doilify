<template>
  <div>
    <SvgIcons style="display: none"/>
    <svg style="border:solid 1px red; width:50px; height:50px" >
      <use class="icon" xlink:href="#symbol1865"/>
    </svg>
  </div>
</template>

<script>
import SvgIcons from '../components/svgIcons.vue'

export default {
  name: 'svg',
  components: {
    SvgIcons: SvgIcons
  }
}
</script>

<style>
.icon {fill: red; color:blue; border: solid 1px red}
.icon:hover {fill: yellow; color:green}
</style>
