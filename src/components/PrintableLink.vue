<template>
  <path
    class="link"
    :d="path"
    stroke="black"
    fill="none"
  />
</template>

<script>
// import { tokenizeDrawingCommands, parseDrawingCmds, Plotter } from '../engine/misc/graphics.js'
// import { tokenizeDrawingCommands, parseDrawingCmds } from '../engine/misc/graphics.js'
import { Plotter } from '../engine/misc/graphics.js'

export default {
  name: 'PrintableLink',
  components: {
    // Stitch: Stitch
  },
  props: {
    link: {
      type: Object,
      default: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    path () {
      const fromPoint = this.link.source.getVector()
      const toPoint = this.link.target.getVector()
      // const pathDef = parseDrawingCmds(tokenizeDrawingCommands(this.link.pathDef))
      const pathDef = this.link.pathCommands
      const path = Plotter.getPathTxt(fromPoint, toPoint, pathDef)
      // console.clear()
      // return 'M -14,-5 m -1,0 a 4,4 -188 0 0 -8, 1'
      // return 'M -14,-5 m -1,0  a 4,4 -188.8211283956727 0 0 -8,1 a 4,4 -188.8211283956727 0 0 8,-1'
      return path
    }
  },
  mounted () {
  }
}
</script>
