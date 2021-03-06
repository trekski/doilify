<template>
  <div>my first vue div</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// import Vec2d from './engine/misc/vector.js'
import Vec2d from '../../CrochetTool/engine/misc/vector.js'
import * as d3 from '../../CrochetTool/d3.v5.min.js'

const v = new Vec2d(0, 0)
// alert(v)
const simulation = d3
  .forceSimulation()
console.log(simulation)

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data () {
    return {
      vec: v.getTxt()
    }
  }
}
</script>

<style>
#app {

}
</style>
