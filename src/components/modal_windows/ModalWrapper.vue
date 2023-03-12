<template>
  <div v-if="modal_store.modal_type" class="wrapper">
    <ColorSelectModal
      v-if = "modal_store.modal_type == 'color_select'"
      :default-color="modal_store.modal_initial_value"
      @modal-return = "$event => processModalReturn($event)"
    />
  </div>
</template>

<script setup>
import { useModalStore } from '../../stores/ModalStore'
import { useToolStore } from '../../stores/ToolStore';
import ColorSelectModal from '../modal_windows/ColorSelectModal.vue'

const modal_store = useModalStore()
const tool_store = useToolStore()

function processModalReturn(event) {
  if (event.status === true) {
    // typical use case is 'tool_store:{setting_key}'
    let target_parts = modal_store.modal_target.split(":")
    switch(target_parts[0]) {
      case 'tool_store' :
        tool_store.change_setting(target_parts[1], event.payload)
        break;
    }
  }
  modal_store.closeModal()
}

</script>

<style>
.wrapper {
  position: relative;
  background-color: rgba(200,200,200,0.5);
  backdrop-filter: blur(2px);
}
</style>