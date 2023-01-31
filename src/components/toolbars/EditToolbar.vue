<template>
  <div id="editToolbar">
    <div
      v-if="showLabel"
      id="infoLabel"
    >
      <PillLabel>{{ infoLabelText }}</PillLabel>
    </div>
    <div id="Icons">
      <IconGroup
        v-for="(grp, i) in nameGroups"
        :key="i"
        dir="row"
      >
        <IconButton
          v-for="(button) in grp"
          :key="button.key"
          :label-text="button.labelText"
          :inactive="button.inactive"
          :selected="button.selected"
          :short-label="button.shortLabel"
          :icon="button.icon"
          @mouseover="changeInfoLabel(button.description)"
          @mouseleave="changeInfoLabel()"
        />
      </IconGroup>
    </div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'
import IconButton from '../gui_elements/IconButton.vue'
import IconGroup from '../gui_elements/IconGroup.vue'
import PillLabel from '../gui_elements/PillLabel.vue'

const nameGroups = [
  [
    {
      key: 0,
      icon: 'svg:svg-icon-new-page',
      description: 'add new page'
    },
    {
      key: 1,
      icon: 'svg:svg-icon-default',
      description: 'first button v.1'
    },
    {
      key: 2,
      labelText: 'button 1.1',
      icon: 'svg:svg-icon-default',
      description: 'first button v.2'
    },
    {
      key: 3,
      shortLabel: 'BUT',
      icon: 'svg:svg-icon-default',
      description: 'first button v.3'
    },
    {
      key: 4,
      labelText: 'button 2',
      inactive: true,
      description: 'second button'
    },
    {
      key: 5,
      labelText: 'button 3',
      selected: true,
      description: 'third button'
    }
  ]
]

const infoLabelText = ref('')

const showLabel = computed(() => {
  return infoLabelText.value !== ''
})

function changeInfoLabel (s = '') {
  this.infoLabelText = s
}
</script>

<style scoped>
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
