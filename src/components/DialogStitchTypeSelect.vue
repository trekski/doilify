<template>
  <div style="text-align: left;">
    <div
      v-for="(group, i) in allowedStitches"
      :key="i"
    >
      <div class="listGroup">
        {{ group.groupName }}
      </div>
      <div
        v-for="(item, j) in group.members"
        :key="j"
        class="listItem"
        @click="stitchTypeSelected(item.code)"
      >
        <button
          class="stitchIcon"
          :title="item.code"
        />
        <div>{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DialogStitchTypeSelect',
  props: ['initialValue'],
  emits: ['stitchTypeSelected'],
  data () {
    return {
      allowedStitches: [
        {
          groupName: 'basic',
          members: [
            { code: 'slip', desc: 'slip stitch' },
            { code: 'ch', desc: 'chain stitch' },
            { code: 'sc', desc: 'single crochet' },
            { code: 'hc', desc: 'half-double  crochet' },
            { code: 'dc', desc: 'double crochet' },
            { code: 'tc', desc: 'treble crochet' }
          ]
        },
        {
          groupName: 'decreases',
          members: [
            { code: 'sc2tog', desc: 'sc two together' },
            { code: 'sc3tog', desc: 'sc three together' },
            { code: 'dc2tog', desc: 'dc two together' },
            { code: 'dc3tog', desc: 'dc three together' },
            { code: 'dc4tog', desc: 'dc four together' },
            { code: 'tc2tog', desc: 'tc two together' },
            { code: 'tc3tog', desc: 'tc three together' },
            { code: 'tc4tog', desc: 'tc four together' }
          ]
        },
        {
          groupName: 'fancy',
          members: [
            { code: 'pic3', desc: '3-chain picot' },
            { code: 'pic5', desc: '5-chain picot' },
            { code: 'pop', desc: 'popcorn stitch' },
            { code: 'puff', desc: 'puff stitch' }
          ]
        }
      ]
    }
  },
  computed: {
    groupSelected () {
      return 1
    }
  },
  methods: {
    stitchTypeSelected (stitchType) {
      this.$emit('stitchTypeSelected', stitchType)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.stitchIcon {
  height: 30px;
  min-width: 30px;
  width: 30px
}
.listItem {
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>
