<template>
  <g>
    <g id="technical_layer">
      <Stitch
        v-for="(s, index) in stitches"
        :key="index"
        :stitch="s"
      />
    </g>
    <g id="diagram_layer">
      <PrintableLink
        v-for="(l, index) in printable_links"
        :key="index"
        :link="l"
      />
    </g>
  </g>
</template>

<script>
import CrochetStitchFactory from '../engine/stitches/stitchFactory.js'
import Stitch from './Stitch.vue'
import PrintableLink from './PrintableLink.vue'
import * as d3 from 'd3'

export default {
  name: 'Doily',
  components: {
    Stitch: Stitch,
    PrintableLink: PrintableLink
  },
  props: {
    appState: {
      type: Object,
      default: Object
    }
  },
  data () {
    return {
      stitches: [],
      simulation: d3
        .forceSimulation()
        .velocityDecay(0.05)
        .alphaMin(0.00000001)
        .force(
          'charge',
          d3.forceManyBody()
            .strength(-0.2)
            .distanceMin(5)
            .distanceMax(50)
        ),
      live_node: Object,
      selected_nodes: []
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
    },
    printable_links () {
      let l = []
      l = this.all_links.filter(e => (e.isPrintable & !e.isDeleted))
      return l
    }
  },
  mounted () {
    var s = CrochetStitchFactory.getNewObject('origin', 'doily')
    this.stitches.push(s)
    this.refresh_simulation()
    this.live_node = s.getLastLoop()
    this.selected_nodes.push(s.getLastLoop())
  },
  methods: {
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    refresh_simulation () {
      this.simulation
        .nodes(this.all_nodes)
        .force(
          'link',
          d3.forceLink(this.all_links)
            .distance(d => d.getLen())
        )
        .alpha(1)
        .restart()
    },
    reheat_simulation () {
      this.simulation.alpha(1).restart()
    },
    makeStitch () {
      const s = CrochetStitchFactory.getNewObject(
        this.appState.mainStitchType,
        'doily',
        this.live_node,
        this.selected_nodes
      )
      this.stitches.push(s)
      this.live_node = s.getLastLoop()
      this.refresh_simulation()
      this.autoSelectNodes()
    },
    unmakeStitch () {
      this.simulation.stop()
      const s = this.stitches.pop()
      this.live_node = this.stitches[this.stitches.length - 1].getLastLoop()
      this.refresh_simulation()
      s.apoptose()
      this.autoSelectNodes()
    },
    autoSelectNodes () {
      return false
    }
  }
}
</script>
