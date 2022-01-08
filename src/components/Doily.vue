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
      <g
        v-for="(l, index) in all_links"
        :key="index"
        :link="l"
      >
        <path
          v-if="l.isPrintable"
          :d="1"
        />
      </g>
    </g>
  </g>
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
        // .nodes(nds)
        .force('charge', d3.forceManyBody().strength(-0.2)),
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
    }
  },
  mounted () {
    var s = CrochetStitchFactory.getNewObject('origin', 'doily')
    this.stitches.push(s)
    this.refresh_simulation()
    this.live_node = s.getLastLoop()
    this.selected_nodes.push(s.getLastLoop())
    // var n, n2
    /*
    this.sleep(200).then(() => {
      n = s.getLastLoop()
      s = CrochetStitchFactory.getNewObject('ch', 'doily', n)
      this.stitches.push(s)
      this.refresh_simulation()
      this.sleep(200).then(() => {
        n2 = s.getLastLoop()
        s = CrochetStitchFactory.getNewObject('ch', 'doily', n2)
        this.stitches.push(s)
        this.refresh_simulation()
        this.sleep(200).then(() => {
          n2 = s.getLastLoop()
          s = CrochetStitchFactory.getNewObject('ch', 'doily', n2)
          this.stitches.push(s)
          this.refresh_simulation()
          this.sleep(200).then(() => {
            n2 = s.getLastLoop()
            s = CrochetStitchFactory.getNewObject('dc', 'doily', n2, [n])
            this.stitches.push(s)
            this.refresh_simulation()
            this.sleep(200).then(() => {
              this.refresh_simulation()
              this.sleep(200).then(() => {
                this.refresh_simulation()
              })
            })
          })
        })
      })
    })
    */
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
    }
  }
}
</script>
