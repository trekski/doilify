<template>
  <div id="editToolbar">
    <div v-if="showLabel" id="infoLabel">
      <PillLabel>{{ infoLabelText }}</PillLabel>
    </div>
    <div id="Icons">
      <IconGroup dir="row">
        <template v-for="(button, i) in buttons" :key="button.key">
          <IconSpacer v-if="i > 0" />
          <IconButton
            :label-text="button.labelText"
            :inactive="button.inactive"
            :selected="button.selected"
            :short-label="button.shortLabel"
            :icon="button.icon"
            @mouseover="changeInfoLabel(button.description)"
            @mouseleave="changeInfoLabel()"
          />
        </template>
      </IconGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import IconButton from "../gui_elements/IconButton.vue";
import IconGroup from "../gui_elements/IconGroup.vue";
import PillLabel from "../gui_elements/PillLabel.vue";
import IconSpacer from "../gui_elements/IconSpacer.vue"

const buttons = [
  {
    key: "stitch_type",
    icon: "svg:svg-icon-change-stitch-type",
    labelText: "type",
    description: "change stitch type",
  },
  {
    key: "color",
    icon: "svg:svg-icon-default",
    labelText: "color",
    description: "change stitch color",
  },
  {
    key: "delete",
    icon: "svg:svg-icon-delete-stitch",
    labelText: "delete",
    description: "delete stitches",
  },
  {
    key: "insert",
    icon: "svg:svg-icon-default",
    labelText: "insert",
    description: "insert stitches (after selected)",
  },
  {
    key: "move",
    icon: "svg:svg-icon-reconnect-stitch",
    labelText: "move",
    description: "change stitch connections",
  },
  {
    key: "clone",
    icon: "svg:svg-icon-default",
    labelText: "clone",
    description: "duplicate stitches",
  },
]
;

const infoLabelText = ref("");

const showLabel = computed(() => {
  return infoLabelText.value !== "";
});

function changeInfoLabel(s = "") {
  this.infoLabelText = s;
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
