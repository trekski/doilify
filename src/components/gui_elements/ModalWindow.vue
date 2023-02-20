<template>
  <div class="modal_container default_shadow">
    <div class="modal_header">Window name</div>
    <div class="modal_content">
      <slot>Hello, World!</slot>
    </div>
    <div class="modal_buttons_bar">
      <TextButton v-if="affirmative" @click="$emit('affirmative')">
        {{ affirmative }}
      </TextButton>
      <TextButton v-if="negative" @click="$emit('negative')">
        {{ negative }}
      </TextButton>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import TextButton from "./TextButton.vue";

defineProps({
  affirmative: {
    type: String,
    default: "OK",
  },
  negative: {
    type: String,
    default: "Cancel",
  },
});

defineEmits(['affirmative', 'negative']);

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
  padding: 7px;
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
  column-gap: 10px;
}
</style>
