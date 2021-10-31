<template>
  <div>
    <br>
    <br>
    <br>
    <div
      v-for="(n, index) in all_nodes"
      :key="index"
    >
    {{ n.getVector().getTxt(2)}}
    </div>
    <div>
    {{ this.simulation.alpha() }}
    </div>
    <Stitch
      v-for="(s, index) in stitches"
      :key="index"
      :stitch="s"
    />
  </div>
</template>

<script>
import CrochetStitchFactory from '../engine/stitches/stitchFactory.js'
import Stitch from './Stitch.vue'
import * as d3 from 'd3'

export default {
  name: 'Doily',
  components: {
    Stitch: Stitch
  },
  props: {},
  data () {
    return {
      stitches: [],
      simulation: d3
        .forceSimulation()
        .velocityDecay(0.05)
        // .alphaMin(0.00000001)
        // .nodes(nds)
        .force('charge', d3.forceManyBody().strength(-0.2))
    }
  },
  computed: {
    all_nodes () {
      let n = []
      this.stitches.reduce(
        (prevStitch, currStitch) => {
          n = n.concat(currStitch._nodes)
        },
        []
      )
      return n
    },
    all_links () {
      let l = []
      this.stitches.reduce(
        (prevStitch, currStitch) => {
          l = l.concat(currStitch._links)
        },
        []
      )
      return l
    }
  },
  mounted () {
    var s = CrochetStitchFactory.getNewObject('origin', 'doily')
    this.stitches.push(s)
    var n = s.getLastLoop()
    s = CrochetStitchFactory.getNewObject('ch', 'doily', n)
    this.stitches.push(s)
    var n2 = s.getLastLoop()
    s = CrochetStitchFactory.getNewObject('sc', 'doily', n2, [n])
    this.stitches.push(s)
    n2 = s.getLastLoop()
    s = CrochetStitchFactory.getNewObject('dc', 'doily', n2, [n])
    this.stitches.push(s)
    n2 = s.getLastLoop()
    s = CrochetStitchFactory.getNewObject('slst', 'doily', n2, [n])
    this.stitches.push(s)
    this.simulation
      .nodes(this.all_nodes)
      .force(
        'link',
        d3.forceLink(this.all_links)
          .distance(d => d.getLen())
      )
  }
}
</script>
