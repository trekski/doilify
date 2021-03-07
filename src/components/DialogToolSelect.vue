<template>
  <div style="text-align: center">
    <div class="description">please select a tool</div>
    <div>
      <button class="toolicon" title="crochet"><img src="/icons/toolCrochet.svg"></button>
      <button class="toolicon" title="pan and zoom"><img src="/icons/toolPanZoom.svg"></button>
      <button class="toolicon" title="map"><img src="/icons/toolMap.svg"></button>
    </div>
    <div>
      <button class="toolicon" title="move stitch"><img src="/icons/toolMove.svg"></button>
      <button class="toolicon" title="change stitch color"><img src="/icons/toolReColor.svg"></button>
      <button class="toolicon" title="change stitch type"><img src="/icons/toolReType.svg"></button>
    </div>
    <div>
      <button class="toolicon" title="delete stitches"><img src="/icons/toolDelete.svg"></button>
      <button class="toolicon" title="insert stitches"><img src="/icons/toolInsert.svg"></button>
      <button class="toolicon" title="duplicate stitches"><img src="/icons/toolDuplicate.svg"></button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DialogToolSelect',
  emits: ['dialogPayload'],
  data () {
    return 0
  },
  methods: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .toolicon {
    height: 45px;
    width: 45px;
    margin: 5px;
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
</style>
