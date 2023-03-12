<template>
  <div id="modeToolbar">
    <div v-if="showLabel" id="infoLabel">
      <PillLabel>{{ infoLabelText }}</PillLabel>
    </div>
    <div id="Icons">
      <IconGroup dir="row">
        <IconButton
          :selected="false"
          icon="svg:svg-icon-mode-view"
          @mouseover="changeInfoLabel('view w/o changing')"
          @mouseleave="changeInfoLabel()"
        />
        <IconSpacer />
        <IconButton
          :selected="false"
          icon="svg:svg-icon-mode-crochet"
          @mouseover="changeInfoLabel('crochet naturally')"
          @mouseleave="changeInfoLabel()"
        />
        <IconSpacer />
        <IconButton
          :selected="false"
          icon="svg:svg-icon-mode-edit"
          @mouseover="changeInfoLabel('tweak and edit')"
          @mouseleave="changeInfoLabel()"
        />
      </IconGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import { useToolStore } from "../../stores/ToolStore";
import IconButton from "../gui_elements/IconButton.vue";
import IconGroup from "../gui_elements/IconGroup.vue";
import IconSpacer from "../gui_elements/IconSpacer.vue"
import PillLabel from "../gui_elements/PillLabel.vue";

// const tool_store = useToolStore()

const infoLabelText = ref("");

const showLabel = computed(() => {
  return infoLabelText.value !== "";
});

function changeInfoLabel(s = "") {
  this.infoLabelText = s;
}

</script>

<style scoped>
#modeToolbar {
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 25px;
  left: 25px;
  flex-direction: column;
}
#modeToolbar #infoLabel {
  display: flex;
  justify-content: center;
}
#modeToolbar #Icons {
  display: flex;
  justify-content: center;
  column-gap: 7px;
}
</style>
