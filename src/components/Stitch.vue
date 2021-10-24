<template>
  <div class="stitch">
    stitch : {{ stitch.toString() }} <br>
    {{ stitch.sequence }}<br>
    <u>nodes</u>
    <ul>
      <li
        v-for="(n, i) in stitch._nodes"
        :key="i"
      >
        {{ n.toString() }}
      </li>
    </ul>
    <u>links</u>
    <ul>
      <li
        v-for="(l, i) in stitch._links"
        :key="i"
      >
        {{ l.toString() }}
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
