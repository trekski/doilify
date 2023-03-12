<template>
  <div id="editToolbar">
    <div v-if="showLabel" id="infoLabel">
      <PillLabel>{{ infoLabelText }}</PillLabel>
    </div>
    <div id="Icons">
      <IconGroup dir="row">
        <IconButton
          label-text="type"
          :selected="tool_store.selected_tool=='stitch_type'"
          icon="svg:svg-icon-change-stitch-type"
          @mouseover="changeInfoLabel('change stitch type')"
          @mouseleave="changeInfoLabel()"
          @click="toggleTool('stitch_type')"
        />
        <IconSpacer />
        <IconButton
          label-text="color"
          :selected="tool_store.selected_tool=='change_color'"
          :icon="'color:' + tool_store.edit_color"
          @mouseover="changeInfoLabel('change stitch color')"
          @mouseleave="changeInfoLabel()"
          @click="toggleTool('change_color')"
        />
        <IconSpacer />
        <IconButton
          label-text="delete"
          :selected="tool_store.selected_tool=='delete'"
          icon="svg:svg-icon-delete-stitch"
          @mouseover="changeInfoLabel('delete a stitch')"
          @mouseleave="changeInfoLabel()"
          @click="toggleTool('delete')"
        />
        <IconSpacer />
        <IconButton
          label-text="insert"
          :selected="tool_store.selected_tool=='insert'"
          icon="svg:svg-icon-insert-stitch"
          @mouseover="changeInfoLabel('insert stitches (after selected)')"
          @mouseleave="changeInfoLabel()"
          @click="toggleTool('insert')"
        />
        <IconSpacer />
        <IconButton
          label-text="move"
          :selected="tool_store.selected_tool=='move'"
          icon="svg:svg-icon-reconnect-stitch"
          @mouseover="changeInfoLabel('change stitch connections')"
          @mouseleave="changeInfoLabel()"
          @click="toggleTool('move')"
        />
        <IconSpacer />
        <IconButton
          label-text="move"
          icon="svg:svg-icon-clone-stitch"
          @mouseover="changeInfoLabel('duplicate stitches')"
          @mouseleave="changeInfoLabel()"
          @click="toggleTool('clone')"
        />
      </IconGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModalStore } from "../../stores/ModalStore";
import { useToolStore } from "../../stores/ToolStore";
import IconButton from "../gui_elements/IconButton.vue";
import IconGroup from "../gui_elements/IconGroup.vue";
import PillLabel from "../gui_elements/PillLabel.vue";
import IconSpacer from "../gui_elements/IconSpacer.vue"

const modal_store = useModalStore()
const tool_store = useToolStore()

const infoLabelText = ref("");

const showLabel = computed(() => {
  return infoLabelText.value !== "";
});

function changeInfoLabel(s = "") {
  this.infoLabelText = s;
}

function toggleTool(key) {
  if (key == "change_color") {
    modal_store.openModal("color_select", "tool_store:edit_color","red")
  }
  tool_store.selected_tool = key
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
  transform: translateX(-50%);
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
