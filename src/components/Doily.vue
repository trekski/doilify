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
    console.log(s)
    this.stitches.push(s)
  }
}
</script>
