<template>
  <div id="editToolbar">
    <div
      v-if="show_label"
      id="infoLabel"
    >
      <PillLabel>{{ info_label_value }}</PillLabel>
    </div>
    <div id="Icons">
      <IconGroup
        v-for="(grp, i) in name_groups"
        :key="i"
        dir="row"
      >
        <IconButton
          v-for="(name, j) in grp"
          :key="j"
          :name="name"
          @mouseover="changeInfoLabel(name)"
          @mouseleave="changeInfoLabel()"
        />
        <IconSpacer />
        <IconButton
          v-for="(name, j) in grp"
          :key="j"
          :name="name"
          inactive=true
          @mouseover="changeInfoLabel(name)"
          @mouseleave="changeInfoLabel()"
        />
      </IconGroup>
    </div>
  </div>
</template>

<script>
import IconButton from '../gui_elements/IconButton.vue'
import IconGroup from '../gui_elements/IconGroup.vue'
import PillLabel from '../gui_elements/PillLabel.vue'
import IconSpacer from '../gui_elements/IconSpacer.vue'

export default {
  name: 'EditToolbar',
  components: {
    IconButton: IconButton,
    IconGroup: IconGroup,
    PillLabel: PillLabel,
    IconSpacer: IconSpacer
  },
  data () {
    return {
      name_groups: [
        ['foo', 'bar'],
        ['button_a', 'button_b', 'ccccc', 'ddd'],
        ['fjfjf']
      ],
      info_label_value: ''
    }
  },
  computed: {
    show_label () {
      return this.info_label_value !== ''
    }
  },
  methods: {
    changeInfoLabel (s = '') {
      this.info_label_value = s
    }
  }
}
</script>

<style>
#editToolbar {
  position: fixed;
  display: flex;
  justify-content: center;
  /**/
  bottom: 25px;
  left: 50%;
  transform:  translateX(-50%);
  flex-direction: column;
  /*
  left: 25px;
  top: 50%;
  transform:  translateY(-50%);
  flex-direction: row;
  row-gap: 10px;
  */
}
#editToolbar #infoLabel {
  display: flex;
  justify-content: center;
}
#editToolbar #Icons {
  display: flex;
  justify-content: center;
  column-gap: 7px;
}
</style>
