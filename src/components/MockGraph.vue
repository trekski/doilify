<template>
  <svg
    id="graph"
    tabindex="0"
    ref="defaultFocus"
    @mousedown="dragStart"
    @mouseup="dragStop"
    @mouseleave="dragStop"
    @mousemove.exact="dragPan"
    @mousemove.shift.exact="dragZoom"
    @mousemove.ctrl.exact="dragPivot"
    @mousemove.meta.exact="dragPivot"
    @mousewheel="mouseWheelUsed"
    @keydown.shift.exact="keyPressedShifted"
    @touchstart="touchChangePoints"
    @touchend="touchChangePoints"
    @touchcancel="touchChangePoints"
    @touchmove="touchUsed"
  >
    <g
      id="graphMover"
      :transform="`translate(${this.baseShiftX} ${this.baseShiftY}), scale(${this.graphScale}), rotate(${this.graphRotate}), translate(${this.shiftX} ${this.shiftY})`"
      @keydown="k"
    >
      <g v-for="row in 9" :key="row" @keydown="k">
        <text
          v-for="(col, index) in columns"
          :key="index"
          :y="100*row-400"
          :x="index*100-700"
          @keydown="k"
        >
          {{ col }}:{{ row }}
        </text>
      </g>
      <circle cx="0" cy="0" r="10" fill="red" />
    </g>
    <circle :cx="this.baseShiftX" :cy="this.baseShiftY" r="5" fill="blue" />
    <text x="100" y="100" style=" fill: #F00">
      {{ touchData.info }}
    </text>
  </svg>
</template>

<script>
import Vec2d from '../engine/misc/vector.js'

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
      touchData: {
        from: null,
        to: null,
        info: ''
      },
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
  mounted () {
    this.$refs.defaultFocus.focus()
  },
  unmounted () {
    window.removeEventListener('resize', this.adjsutBase)
  },
  methods: {
    adjsutBase () {
      this.baseShiftX = document.documentElement.clientWidth / 2
      this.baseShiftY = document.documentElement.clientHeight / 2
    },
    executePan (deltaX, deltaY) {
      // to apply correct shifts, we need to transfortm pointer coords
      // into the SVG-after-transformation coords.
      deltaX /= this.graphScale
      deltaY /= this.graphScale
      const rads = this.graphRotate / 360 * 2 * Math.PI
      this.shiftX += deltaX * Math.cos(rads) + deltaY * Math.sin(rads)
      this.shiftY += -deltaX * Math.sin(rads) + deltaY * Math.cos(rads)
    },
    executeZoom (deltaZoom) {
      this.scaleFactor += deltaZoom
      this.scaleFactor = Math.min(400, this.scaleFactor)
      this.scaleFactor = Math.max(-400, this.scaleFactor)
    },
    executeRotation (deltaRotate) {
      this.rotateFactor += deltaRotate
      this.rotateFactor = this.rotateFactor % 3600
    },
    // handle mouse events
    dragStart () {
      this.isDragged = true
    },
    dragStop () {
      this.isDragged = false
    },
    dragPan (e) {
      if (!this.isDragged) return
      this.executePan(e.movementX, e.movementY)
    },
    dragZoom (e) {
      if (!this.isDragged) return
      const delta = (Math.abs(e.movementX) > Math.abs(e.movementY)) ? e.movementX : -e.movementY
      this.executeZoom(delta)
    },
    dragPivot (e) {
      // if (!this.isDragged) return
      const H = e.clientX - this.baseShiftX
      const V = e.clientY - this.baseShiftY
      const R = Math.sqrt(H * H + V * V)
      let delta = 0
      if (Math.abs(H) > Math.abs(V)) {
        // dragging happened closer to horizontal mid-axis
        delta = (H > 0) ? e.movementY : -e.movementY
      } else {
        // dragging happened closer to vertival mid-axis
        delta = (V > 0) ? -e.movementX : e.movementX
      }
      delta = delta * 650 / R
      this.executeRotation(delta)
    },
    mouseWheelUsed (e) {
      const delta1 = e.wheelDeltaY / 4
      // const delta2 = e.wheelDeltaX
      this.executeZoom(delta1)
      // this.executeRotation(delta2)
    },
    keyPressedShifted (e) {
      switch (e.code) {
        case 'ArrowRight':
          this.executePan(100, 0)
          break
        case 'ArrowLeft':
          this.executePan(-100, 0)
          break
        case 'ArrowDown':
          this.executePan(0, 100)
          break
        case 'ArrowUp':
          this.executePan(0, -100)
          break
        case 'Minus':
          this.executeZoom(-50)
          break
        case 'Equal':
          this.executeZoom(50)
          break
        case 'Digit0':
          this.scaleFactor = 0
          break
        case 'Period':
          this.rotateFactor = 0
          break
        case 'KeyH':
          this.shiftX = 0
          this.shiftY = 0
          break
        default:
          console.log(e.code)
      }
    },
    touchChangePoints (e) {
      if (e.touches.length === 1) {
        this.touchSet1(e.touches[0])
      } else if (e.touches.length === 2) {
        this.touchSet2(e.touches)
      } else {
        this.touchClear()
      }
    },
    touchSet2 (touches) {
      const newFrom = new Vec2d(touches[0].clientX, touches[0].clientY)
      const newTo = new Vec2d(touches[1].clientX, touches[1].clientY)
      this.touchData.from = newFrom
      this.touchData.to = newTo
    },
    touchSet1 (touch) {
      const newFrom = new Vec2d(touch.clientX, touch.clientY)
      this.touchData.from = newFrom
      this.touchData.to = null
    },
    touchClear () {
      this.touchData.from = null
      this.touchData.to = null
    },
    touchUsed (e) {
      console.log('move')
      if (e.touches.length === 1) {
        const newFrom = new Vec2d(e.touches[0].clientX, e.touches[0].clientY)
        const deltaTransl = newFrom.sub(this.touchData.from)
        this.executePan(deltaTransl._x, deltaTransl._y)
        this.touchData.from = newFrom
      } else if (e.touches.length === 2) {
        // figure out geometry of what happened
        // // new positions
        const newFrom = new Vec2d(e.touches[0].clientX, e.touches[0].clientY)
        const newTo = new Vec2d(e.touches[1].clientX, e.touches[1].clientY)
        const newDir = newTo.sub(newFrom)
        const newMid = newFrom.add(newTo).scale(0.5)
        const newLen = newFrom.sub(newTo).len()
        // // previous positions
        const curDir = this.touchData.to.sub(this.touchData.from)
        const curMid = this.touchData.from.add(this.touchData.to).scale(0.5)
        const curLen = this.touchData.from.sub(this.touchData.to).len()
        // // rotation that happened
        const deltaRot = (newDir.phi() - curDir.phi()) * 180 / Math.PI
        // // translation that happened
        const deltaTransl = newMid.sub(curMid)
        // // zoom that happened
        var newFactor = 0
        var newScale = 1
        console.log(curLen, newLen)
        if (curLen > 0 && newLen > 0) {
          newScale = newLen / curLen
          newFactor = Math.log(newScale) / Math.log(2) * 100
        }
        // execute changes
        this.executeRotation(-deltaRot * 10)
        this.executeZoom(newFactor)
        // // additional translation to make the "zoom/turn center" between pointers
        const panCorrectionBase = curMid.sub(new Vec2d(this.baseShiftX, this.baseShiftY))
        const panZoomCorrection = panCorrectionBase.scale(1 - newScale)
        const panRotCorrection = panCorrectionBase.sub(panCorrectionBase.rot(newDir.phi() - curDir.phi()))
        this.executePan(panZoomCorrection._x, panZoomCorrection._y)
        this.executePan(panRotCorrection._x, panRotCorrection._y)
        // // normal translation
        this.executePan(deltaTransl._x, deltaTransl._y)
        // update "last position"
        this.touchData.info = deltaRot
        this.touchData.from = newFrom
        this.touchData.to = newTo
      } else {
        // stop tracking
        this.touchData.from = null
        this.touchData.to = null
        // this.touchData.info = ''
      }
      // this.touchData.info = 3 // e.touches.length
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
  touch-action: none;
}

#graph text {
  font: bold 30px sans-serif;
  font-family: courier;
  fill: gray;
  stroke-width: 0px;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

</style>
