<template>
  <div style="text-align: left;">
    <div
      v-for="(group, i) in allowedStitches"
      :key="i"
      class="stitchGroup"
      :class="{ groupSelected : group.name === selectedGroup, groupHighlighted : group.name === highlightedGroup}"
    >
      <div
        class="groupHeader"
        @click="selectGroup(group.name)"
      >
        <div class="groupName">
          {{ group.name }}
        </div>
        <div class="groupArrow" />
      </div>
      <div class="groupList">
        <div
          v-for="(item, j) in group.members"
          :key="j"
          class="listItem"
          :class="{ stitchSelected : item.code === selectedStitch }"
          @click="stitchTypeSelected(item.code)"
        >
          <button
            class="stitchIcon"
            :title="item.code"
          />
          <div class="stitchLabel">
            {{ item.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogStitchTypeSelect',
  props: {
    initialValue: {
      type: String,
      default: 'ch'
    }
  },
  emits: ['stitchTypeSelected'],
  data () {
    return {
      allowedStitches: [
        {
          name: 'basic',
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
          name: 'decreases',
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
          name: 'fancy',
          members: [
            { code: 'pic3', desc: '3-chain picot' },
            { code: 'pic5', desc: '5-chain picot' },
            { code: 'pop', desc: 'popcorn stitch' },
            { code: 'puff', desc: 'puff stitch' }
          ]
        }
      ],
      newGroupSelected: '',
      newStitchSelected: ''
    }
  },
  computed: {
    selectedGroup () {
      if (this.newGroupSelected !== '') return this.newGroupSelected
      return this.highlightedGroup
    },
    highlightedGroup () {
      return this.allowedStitches
        .filter(
          g => {
            return g.members
              .filter(s => s.code === this.initialValue)
              .length > 0
          }
        )[0].name
    },
    selectedStitch () {
      return (this.newStitchSelected !== '') ? this.newStitchSelected : this.initialValue
    }
  },
  methods: {
    selectGroup (g) {
      this.newGroupSelected = g
    },
    stitchTypeSelected (stitchType) {
      this.$emit('stitchTypeSelected', stitchType)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.stitchGroup {
  margin-bottom: 7px;
  --transition-time: 0.5s;
  --transition-delay: 0.6s;
}
.groupHeader {
  background: var(--main-accent);
  color: var(--text-accent);
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: max-height var(--transition-time), background 0.2s;
  transition: color 0.2s;
  transition-delay: height 0s;
}
.groupHeader:hover {
  background: var(--main-accent-highlight);
  color: var(--text-accent-highlight);
}
.groupHighlighted .groupHeader {
  box-shadow: 0px 0px 0px 2px var(--main-accent-highlight), inset 0px 0px 0px 2px var(--main-accent-highlight);
}
.groupHighlighted .groupHeader:hover {
  box-shadow: 0px 0px 0px 5px var(--main-accent), inset 0px 0px 0px 2px var(--main-accent);
}
.groupArrow {
  border: solid transparent;
  border-left-color: var(--text-accent);
  border-width: 7px 0px 7px 11px;
  margin: 0px;
  width: 0px;
  height: 0px;
  transition: transform var(--transition-time), border-left-color 0.2s;
  transition-delay: 0s;
}
.groupArrow {
  border-left-color: var(--text-accent-highlighted);
}
.groupSelected .groupHeader .groupArrow {
  transform: rotate(90deg);
}
.groupList {
  overflow: hidden;
  transition: all var(--transition-time) ease-in;
  transition-delay: 0s;
  max-height: 0px;
}
.groupSelected  .groupList{
  transition: all var(--transition-time) ease-out;
  transition-delay: var(--transition-delay);
  max-height: 500px;
}
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
.listItem:hover .stitchIcon {
  background: var(--main-accent-highlight);
}
.stitchLabel {transition: all 0.2s}
.listItem.stitchSelected .stitchLabel { color: var(--main-accent-highlight);}
.listItem:hover .stitchLabel { color: var(--main-accent-highlight);}
.listItem.stitchSelected .stitchIcon {
  box-shadow: 0px 0px 0px 2px var(--main-accent-highlight), inset 0px 0px 0px 2px var(--main-accent-highlight);
}
.listItem.stitchSelected:hover .stitchIcon {
  box-shadow: 0px 0px 0px 5px var(--main-accent), inset 0px 0px 0px 2px var(--main-accent);
}

</style>
