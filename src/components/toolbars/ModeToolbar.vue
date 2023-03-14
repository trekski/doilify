<template>
  <div id="modeToolbar">
    <div v-if="showLabel" id="infoLabel">
      <PillLabel>{{ infoLabelText }}</PillLabel>
    </div>
    <div id="Icons">
      <IconGroup
        dir="row"
        class="shrinking_container"
        @mouseover="toggleGrayout(true)"
        @mouseleave="toggleGrayout(false)"
      >
        <template v-for=" b in buttons" :key="b.key">
          <template v-if="b.key == selected_mode">
            <IconButton
              :selected="false"
              :icon="b.icon"
              :inactive="grayedOut"
              @mouseover="changeInfoLabel('select a new mode')"
              @mouseleave="changeInfoLabel()"
              @click="changeSelectedMode(b.key)"
            />
          </template>
        </template>
        <IconSpacer v-if="grayedOut" />
        <template v-for=" b in buttons" :key="b.key">
          <IconButton
            :selected="false"
            :icon="b.icon"
            :class="{'shrinking_item' : true | b.key != selected_mode}"
            @mouseover="changeInfoLabel(b.info)"
            @mouseleave="changeInfoLabel()"
            @click="changeSelectedMode(b.key)"
          />
        </template>
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
const grayedOut = ref(false);

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

const selected_mode = ref('view')

function changeSelectedMode(key) {
  selected_mode.value = key
}

const showLabel = computed(() => {
  return infoLabelText.value !== "";
});

function changeInfoLabel(s = "") {
  this.infoLabelText = s;
}

function toggleGrayout(e) {
  grayedOut.value = e
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
  column-gap: 7px;
}
#modeToolbar:hover #Icons {
  max-width: 200px;
}
.shrinking_container {
  column-gap: 0px;
  transition: column-gap 0.2s;
}
.shrinking_container:hover {
  column-gap: 5px;
}
.shrinking_item {
  max-width: 0px;
  transition: max-width 0.2s;
  overflow: hidden;
}
#modeToolbar:hover .shrinking_item {
  max-width: 100px;
  overflow: hidden;
}
</style>
