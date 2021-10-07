<template>
  <div class="stitch">
    stitch : {{ stitch.id }} <br />
    <u>nodes</u>
    <ul>
      <li
        v-for="(n, i) in  stitch.nodes"
        :key="i"
      >
      </li>
    </ul>
    <u>links</u>
    <ul>
      <li>
      </li>
    </ul>
  </div>
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
  computed: {
    nodes () {
      return Array.from(this.stitch._nodes.keys())
    }
  },
  data () {
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
