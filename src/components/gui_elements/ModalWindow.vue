<template>
  <div class="modal_container default_shadow">
    <div class="modal_header">Window name</div>
    <div class="modal_content">
      <slot>Hello, World!</slot>
    </div>
    <div class="modal_buttons_bar">
      <TextButton v-if="acknowledge">
        {{ acknowledge }}
      </TextButton>
      <TextButton v-if="deny">
        {{ deny }}
      </TextButton>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import TextButton from './TextButton.vue'

defineProps({
  acknowledge: {
    type: String,
    default: 'OK we 3r'
  },
  deny: {
    type: String,
    default: 'Cancel'
  }
})

console.log(TextButton)
</script>

<style scoped>
.modal_container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-background);
  min-width: 300px;
  border-radius: 5px;
}
.modal_header {
  min-height: 1em;
  padding: 10px;
  background: var(--color-background-high1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 0px 0px;
}
.modal_content {
  padding: 10px;
}
.modal_buttons_bar {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;;
}
</style>
