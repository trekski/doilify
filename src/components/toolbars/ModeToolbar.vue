<template>
  <div
    id="modeToolbar"
  >
    <PillLabel v-if="showLabel & sizeBig" id="infoLabel" >{{ infoLabelText }}</PillLabel>
    <IconGroup
      id="IconRow"
      dir="row"
      :class="{'big_size' : sizeBig}"
      @mouseenter="toggleBigSize(true)"
      @mouseleave="toggleBigSize(false)"
    >
      <IconButton
        :selected="false"
        :inactive="true"
        icon="none"
        label-text="mode"
      />
      <template v-for=" b in buttons" :key="b.key">
        <IconButton
          :selected="b.key == selected_mode & sizeBig"
          :class="{'fixed_item' : b.key == selected_mode}"
          :icon="b.icon"
          @mouseover="changeInfoLabel(b.info)"
          @mouseleave="changeInfoLabel()"
          @click="changeSelectedMode(b.key)"
        />
      </template>
    </IconGroup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import { useToolStore } from "../../stores/ToolStore";
import IconButton from "../gui_elements/IconButton.vue";
import IconGroup from "../gui_elements/IconGroup.vue";
// import IconSpacer from "../gui_elements/IconSpacer.vue"
import PillLabel from "../gui_elements/PillLabel.vue";

// const tool_store = useToolStore()

const infoLabelText = ref("");
const sizeBig = ref(false);
const selected_mode = ref('view')

const buttons = [
  {
    'key' : 'view',
    'icon' : 'svg:svg-icon-mode-view',
    'info' : 'view w/o changing'
  },
  {
    'key' : 'crochet',
    'icon' : 'svg:svg-icon-mode-crochet',
    'info' : 'crochet naturally'
  },
  {
    'key' : 'edit',
    'icon' : 'svg:svg-icon-mode-edit',
    'info' : 'tweak and edit'
  }
]

function changeSelectedMode(key) {
  selected_mode.value = key
  toggleBigSize(false)
}

const showLabel = computed(() => {
  return infoLabelText.value !== "";
});

function changeInfoLabel(s = "") {
  this.infoLabelText = s;
}

function toggleBigSize(e) {
  if (e == undefined) {
    sizeBig.value = !sizeBig.value
} else {
    sizeBig.value = e
  }
}

</script>

<style scoped>

#modeToolbar {
  position: fixed;
  bottom: 25px;
  left: 25px;
  display: flex;
  flex-direction: column;
  --unfold-time: 0.3s;
}

#infoLabel {
  align-self: center;
}

#IconRow {
  column-gap: 0px;
  transition: column-gap var(--unfold-time);
  align-self: start;
}
#IconRow.big_size {
  column-gap: 10px;
}
#IconRow button {
  transition: max-width var(--unfold-time), opacity var(--unfold-time);
  max-width: 0px;
  opacity: 0;
  overflow: hidden;
}

#IconRow.big_size button, #IconRow button.fixed_item {
  max-width: 50px;
  opacity: 1;
}
</style>