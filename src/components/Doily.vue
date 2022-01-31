
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
        v-for="(n, index) in unselected_nodes"
        :key="index"
        :cx="n.x"
        :cy="n.y"
        r="2.5"
        @click="toggleNodeSelection(n)"
      >
        <title>{{ n.id }}</title>
      </circle>
      <circle
        v-for="(n, index) in selected_nodes"
        :key="index"
        :cx="n.x"
        :cy="n.y"
        r="2.5"
        class="isSelected"
        @click="toggleNodeSelection(n)"
      >
        <title>{{ n.id + " : " + index }}</title>
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
      selected_nodes: [],
      simulationLive: true
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
      return this.all_links.filter(e => (e.isPrintable & !e.isDeleted))
    },
    selectable_nodes () {
      return this.all_nodes.filter(e => (e.isLoopable & !e.isDeleted))
    },
    unselected_nodes () {
      return this.selectable_nodes.filter(e => !this.selected_nodes.includes(e))
    },
    requiredLoops () {
      return CrochetStitchFactory.getArgs(this.appState.mainStitchType)[2]
    }
  },
  mounted () {
    var s = CrochetStitchFactory.getNewObject('origin', 'doily')
    s.crochet()
    this.stitches.push(s)
    this.refresh_simulation()
    this.live_node = s.getLastLoop()
    this.selected_nodes.push(s.getLastLoop())
  },
  methods: {
    toggleSimulation () {
      this.simulationLive = !this.simulationLive
      if (this.simulationLive) {
        this.refresh_simulation()
        console.log('simulation is ON = ', this.simulationLive)
      } else {
        this.simulation.stop()
        console.log('simulation is OFF = ', this.simulationLive)
      }
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    refresh_simulation () {
      if (this.simulationLive !== true) return
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
        'doily'
      )
      s.crochet(
        this.live_node,
        this.selected_nodes
      )
      this.stitches.push(s)
      this.live_node = s.getLastLoop()
      this.refresh_simulation()
      this.autoSelectLoops()
    },
    unmakeStitch () {
      if (this.stitches.length <= 1) return
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
      this.orderSelectedNodes()
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
      this.orderSelectedNodes()
    },
    shiftNodeSelection (dir = '') {
      if (this.selected_nodes.length === 0) return
      let node
      if (dir === 'fwd') {
        node = this.selected_nodes.at(-1).getSeqLoop('next', true)
        if (node === undefined) return
        this.selected_nodes.shift()
        this.selected_nodes.push(node)
      }
      if (dir === 'prv') {
        node = this.selected_nodes.at(0).getSeqLoop('prev', true)
        if (node === undefined) return
        this.selected_nodes.pop()
        this.selected_nodes.unshift(node)
      }
      console.groupEnd()
    },
    orderSelectedNodes () {
      const orderedNodes = this.selected_nodes
      orderedNodes.sort(
        (firstNode, secondNode) => {
          let x1 = firstNode.context.ordinal
          let x2 = secondNode.context.ordinal
          if (x1 === undefined || x2 === undefined) return undefined
          if (x1 !== x2) return (x2 - x1)
          x1 = firstNode.ordinal
          x2 = secondNode.ordinal
          if (x1 === undefined || x2 === undefined) return undefined
          return (x2 - x1)
        }
      )
      this.selected_nodes = orderedNodes
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
