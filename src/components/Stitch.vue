<template>
  <g class="stitch">
    <line
      v-for="(link, index) in stitch._links"
      :key="index"
      :x1="link.source.x"
      :y1="link.source.y"
      :x2="link.target.x"
      :y2="link.target.y"
      stroke="lightgray"
      stroke-width="2px"
    />
    <circle
      v-for="(node, index) in stitch._nodes"
      :key="index"
      :cx="node.x"
      :cy="node.y"
      r="1.5"
      fill="gray"
      stroke="0"
    />
  </g>
</template>

<script>
// import Stitch from './Stitch.vue'

export default {
  name: 'Stitch',
  components: {
    // Stitch: Stitch
  },
  props: {
    stitch: {
      type: Object,
      default: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    nodes () {
      return Array.from(this.stitch._nodes.keys())
    }
  },
  mounted () {
  }
}
</script>

<style>
  .stitch {
    border: 1px green solid;
    margin: 5px;
    padding: 5px;
  }
</style>
