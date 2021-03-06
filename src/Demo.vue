<template>
  <div><pre>{{ log }}</pre></div>
</template>

<script>

import vectorDemo from './engine/misc/demos/vector.js'
import helperDemo from './engine/misc/demos/helpers.js'
import graphicsDemo from './engine/misc/demos/graphics.js'
import factoryDemo from './engine/misc/demos/factory.js'
import crochetNodeDemo from './engine/nodes/demos/crochetNode.js'
import crochetLinkDemo from './engine/links/demos/crochetLink.js'
import crochetDrawDemo from './engine/links/demos/crochetDraw.js'
import crochetOperationDemo from './engine/stitches/operations/demos/operations.js'
import crochetStitchDemo from './engine/stitches/demos/stitchFactory.js'

let l = ''

function log (a) {
  l += '> ' + a + '\n'
}

function header (a) {
  l += '\n*** ' + a + ' ***\n\n'
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

header('LINK demo')
crochetLinkDemo(log)

header('DRAW LINK demo')
crochetDrawDemo(log)

header('crochet operation demo')
crochetOperationDemo(log)

header('STITCH demo')
crochetStitchDemo(log)

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
