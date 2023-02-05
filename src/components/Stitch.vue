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
      stroke-width="1px"
    >
      <title>
        {{ link.getContext().id + " : " + link.id + " (" + link.type + ")" }}
      </title>
    </line>
    <circle
      v-for="(node, index) in stitch._nodes"
      :key="index"
      :cx="node.x"
      :cy="node.y"
      r="0.5"
      fill="gray"
      stroke="0"
    >
      <title>{{ node.getContext().id + " : " + node.toString() }}</title>
    </circle>
  </g>
</template>

<script>
export default {
  name: "StitchSprite",
  components: {},
  props: {
    stitch: {
      type: Object,
      default: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    nodes() {
      return Array.from(this.stitch._nodes.keys());
    },
  },
  mounted() {},
};
</script>

<style>
.stitch circle:hover {
  fill: gold;
}
.stitch line:hover {
  stroke: lime;
}
</style>
