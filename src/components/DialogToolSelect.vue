<template>
  <div style="text-align: center">
    <div
      v-for="(group, i) in allowedTools"
      :key="i"
    >
      <button
        v-for="(btn, j) in group"
        :key="j"
        class="toolicon"
        :class="{ toolSelected: initialValue === btn.tool }"
        :title="btn.name"
        @click="toolSelected(btn.tool)"
      >
        <img :src="btn.icon">
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DialogToolSelect',
  props: {
    initialValue: {
      type: String,
      default: 'crochet'
    }
  },
  emits: ['toolSelected'],
  data () {
    return {
      allowedTools: [
        [
          { tool: 'crochet', name: 'crochet', icon: '/icons/toolCrochet.svg' },
          { tool: 'pan_n_zoom', name: 'pan and zoom', icon: '/icons/toolPanZoom.svg' },
          { tool: 'map', name: 'navigate map', icon: '/icons/toolMap.svg' }
        ],
        [
          { tool: 'move', name: 'move stitch', icon: '/icons/toolMove.svg' },
          { tool: 'recolor', name: 'change stitch color', icon: '/icons/toolReColor.svg' },
          { tool: 'retype', name: 'change stitch type', icon: '/icons/toolReType.svg' }
        ],
        [
          { tool: 'delete', name: 'delete stitch', icon: '/icons/toolDelete.svg' },
          { tool: 'insert', name: 'insert new stitch', icon: '/icons/toolInsert.svg' },
          { tool: 'duplicate', name: 'duplicate stitch', icon: '/icons/toolDuplicate.svg' }
        ]
      ]
    }
  },
  computed: {
  },
  methods: {
    toolSelected (tool) {
      this.$emit('toolSelected', tool)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .toolicon {
    height: 50px;
    width: 50px;
    margin: 7px;
    min-width: 0px;
    font-size: 0px;
    padding: 5px;
    overflow: hidden;
  }
  .toolicon img {
    height: 100%;
    width: 100%;
  }
  .description {
    margin: 5px;
  }
  .toolSelected {
    box-shadow: 0px 0px 0px 2px var(--main-accent-highlight), inset 0px 0px 0px 2px var(--main-accent-highlight);
  }
  .toolSelected:hover {
    box-shadow: 0px 0px 0px 5px var(--main-accent), inset 0px 0px 0px 2px var(--main-accent);
  }
</style>
