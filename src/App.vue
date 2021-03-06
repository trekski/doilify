<template>
  <div>my first vue div</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// import Vec2d from './engine/misc/vector.js'
import Vec2d from '../../CrochetTool/engine/misc/vector.js'
import * as d3 from 'd3'

var v = new Vec2d(0, 0)
console.log(v)
const simulation = d3.forceSimulation()
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
