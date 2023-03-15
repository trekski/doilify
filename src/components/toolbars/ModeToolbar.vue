<template>
  <div
    id="modeToolbar"
    :class="{'big_size' : sizeBig}"
  >
    <div v-if="showLabel" id="infoLabel">
      <PillLabel>{{ infoLabelText }}</PillLabel>
    </div>
    <div id="Icons">
      <IconGroup
        dir="row"
        class="shrinking_container"
        @mouseenter="toggleBigSize(true)"
        @mouseleave="toggleBigSize(false)"
      >
        <template v-for=" b in buttons" :key="b.key">
          <IconButton
            :selected="false"
            :icon="b.icon"
            :class="{'shrinking_item' : b.key != selected_mode}"
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
  toggleBigSize()
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
#modeToolbar.big_size #Icons {
  max-width: 200px;
}
.shrinking_container {
  column-gap: 0px;
  transition: column-gap 0.5s;
}
#modeToolbar.big_size .shrinking_container {
  column-gap: 10px;
}
.shrinking_container * {
  transition: max-width 0.5s;
  max-width: 100px;
}
.shrinking_item {
  max-width: 0px;
  overflow: hidden;
}
#modeToolbar.big_size .shrinking_item {
  max-width: 100px;
  overflow: hidden;
}
</style>
