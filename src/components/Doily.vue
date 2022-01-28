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
    <g id="loop_selection_layer">
      <circle
        v-for="(n, index) in selectable_nodes"
        :key="index"
        :cx="n.x"
        :cy="n.y"
        r="2.5"
        :class="{ isSelected: (selected_nodes.includes(n)) }"
        q
        @click="toggleNodeSelection(n)"
      >
        <title>{{ n.id }}</title>
      </circle>
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
    },
    selectable_nodes () {
      let n = []
      n = this.all_nodes.filter(e => (e.isLoopable & !e.isDeleted))
      return n
    },
    requiredLoops () {
      return CrochetStitchFactory.getArgs(this.appState.mainStitchType)[2]
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
      this.autoSelectLoops()
    },
    unmakeStitch () {
      this.simulation.stop()
      const s = this.stitches.pop()
      this.live_node = this.stitches.at(-1).getLastLoop()
      this.refresh_simulation()
      s.apoptose()
      this.resetSelectedLoop()
      this.autoSelectLoops()
    },
    autoSelectLoops () {
      // after making a new stitch - automatically determine the new loops to be used in next
      // check if we need to change
      if (this.requiredLoops === 0) return this.selected_nodes
      // in case we have nothing to work off of...
      if (this.selected_nodes.length === 0) this.resetSelectedLoop()
      if (this.selected_nodes.length === 0) return
      // check what are change options are
      const lastUsedLoop = this.selected_nodes.at(-1)
      const lastUserLazyLoop = this.selected_nodes
        .filter(e => e.context.isLazyNexLoop)
        .at(-1)
      // figure out what to use, and use it
      let nextNewNode = (lastUserLazyLoop !== undefined)
        ? lastUserLazyLoop
        : lastUsedLoop
      const newNodes = (lastUserLazyLoop !== undefined)
        ? [lastUserLazyLoop]
        : []
      nextNewNode = nextNewNode.getSeqLoop('next')
      while (nextNewNode !== undefined && newNodes.length < this.requiredLoops) {
        newNodes.push(nextNewNode)
        nextNewNode = nextNewNode.getSeqLoop('next')
      }
      this.selected_nodes = newNodes
      return newNodes
    },
    resetSelectedLoop () {
      if (this.live_node === undefined) return
      let currStitch = this.live_node.context
      while (
        currStitch.getNodes('hook').length === 0 && // we don't have external hooks
        currStitch.type !== 'origin'
      ) {
        currStitch = currStitch.getPreviousStitch()
      }
      const n = (currStitch.type === 'origin')
        ? currStitch.getFirstLoop()
        : currStitch
          .getNodes('hook')
          .map(n => n.getNeighborNodes('in').at(-1))
          .at(-1)
      this.selected_nodes = [n]
    },
    toggleNodeSelection (n) {
      if (this.selected_nodes.includes(n)) {
        this.selected_nodes = this.selected_nodes.filter(e => e.id !== n.id)
      } else {
        this.selected_nodes.push(n)
      }
      // and then order the array along the main sequence
    }
  }
}
</script>
<style>
  #loop_selection_layer circle {
    fill: yellow;
    opacity: 10%
  }
  #loop_selection_layer circle.isSelected {
    fill: lime;
    opacity: 70%
  }
  #loop_selection_layer circle:hover {
    opacity: 100%
  }
</style>
