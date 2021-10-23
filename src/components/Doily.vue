<template>
  <P>
    <br>
    <br>
    <Stitch
      v-for="(s, index) in stitches"
      :key="index"
      :stitch="s"
    />
  </P>
</template>

<script>
import CrochetStitchFactory from '../engine/stitches/stitchFactory.js'
import Stitch from './Stitch.vue'

export default {
  name: 'Doily',
  components: {
    Stitch: Stitch
  },
  props: {},
  data () {
    return {
      stitches: []
    }
  },
  mounted () {
    var s = CrochetStitchFactory.getNewObject('origin', 'doily')
    this.stitches.push(s)
    var n = s.getLastLoop()
    console.log(n)
    s = CrochetStitchFactory.getNewObject('ch', 'doily', n)
    this.stitches.push(s)
    var n2 = s.getLastLoop()
    console.log(n2)
    s = CrochetStitchFactory.getNewObject('sc', 'doily', n2, [n])
    this.stitches.push(s)
    s = CrochetStitchFactory.getNewObject('dc', 'doily', n2, [n])
    this.stitches.push(s)
    s = CrochetStitchFactory.getNewObject('slst', 'doily', n2, [n])
    this.stitches.push(s)
  }
}
</script>
