<template>
  <svg
    id="graph"
    @mousedown="dragStart"
    @mouseup="dragStop"
    @mouseleave="dragStop"
    @mousemove="dragDo"
  >
    <g
      id="graphMover"
      :transform="`translate(${this.baseShiftX} ${this.baseShiftY}), translate(${this.shiftX} ${this.shiftY}), scale(${this.graphScale}), rotate(${this.graphRotate})`"
    >
      <g v-for="row in 9" :key="row">
        <text
          v-for="(col, index) in columns"
          :key="index"
          :y="100*row-400"
          :x="index*100-700"
        >
          {{ col }}:{{ row }}
        </text>
      </g>
      <circle cx="0" cy="0" r="10" fill="red" />
    </g>
  </svg>
</template>

<script>

export default {
  name: 'MockGraph',
  components: {
  },
  props: {
  },
  data () {
    return {
      columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
      isDragged: false,
      shiftX: 0,
      shiftY: 0,
      scaleFactor: 0,
      rotateFactor: 0,
      baseShiftX: document.documentElement.clientWidth / 2,
      baseShiftY: document.documentElement.clientHeight / 2
    }
  },
  computed: {
    graphScale () { return 2 ** (this.scaleFactor / 100) },
    graphRotate () { return this.rotateFactor / 10 }
  },
  created () {
    window.addEventListener('resize', this.adjsutBase)
  },
  unmounted () {
    window.removeEventListener('resize', this.adjsutBase)
  },
  methods: {
    adjsutBase () {
      console.log('oops!')
      this.baseShiftX = document.documentElement.clientWidth / 2
      this.baseShiftY = document.documentElement.clientHeight / 2
    },
    dragStart () {
      this.isDragged = true
    },
    dragStop () {
      this.isDragged = false
    },
    dragDo (e) {
      if (this.isDragged) {
        if (!e.shiftKey) {
          this.shiftX += e.movementX
          this.shiftY += e.movementY
        } else {
          this.scaleFactor += e.movementY
          this.rotateFactor += e.movementX
          this.dragStop()
          this.dragStart()
          // }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#graph {
  outline: solid 1px red;
  outline-offset: -1px;
  width: 100%;
  height: 100%;
  position: absolute;
}

#graph text {
  font: bold 30px sans-serif;
  font-family: courier;
  fill: gray;
  stroke-width: 0px;
}

</style>
