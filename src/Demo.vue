<template>
  <div><pre>{{ log }}</pre></div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// import Vec2d from './engine/misc/vector.js'
// import Vec2d from '../../CrochetTool/engine/misc/vector.js'
// import * as d3 from '../../CrochetTool/d3.v5.min.js'

// // alert(v)
// const simulation = d3
//  .forceSimulation()
// console.log(simulation)

import vectorDemo from './engine/misc/demos/vector.js'
import helperDemo from './engine/misc/demos/helpers.js'
import graphicsDemo from './engine/misc/demos/graphics.js'
import factoryDemo from './engine/misc/demos/factory.js'
import crochetNodeDemo from './engine/nodes/demos/crochetNode.js'

let l = ''

function log (a) {
  l += '> ' + a + '\n'
}

function header (a) {
  l += '*** ' + a + ' ***\n'
}

header('Ved2d demo')
vectorDemo(log)

header('idGenerator demo')
helperDemo(log)

header('graphics demo')
graphicsDemo(log)

header('factory demo')
factoryDemo(log)

header('NODE demo')
crochetNodeDemo(log)

export default {
  name: 'Demo',
  components: {
    // HelloWorld
  },
  data () {
    return {
      log: l
    }
  }
}
</script>

<style>
#app {
}
</style>
