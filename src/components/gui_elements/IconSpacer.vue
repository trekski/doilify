<template>
  <div class="icon_spacer" />
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  dir: {
    type: String,
    default: 'row'
  }
})
</script>

<style>
.icon_spacer {
  border: none;
  background: lightgray;
  height: 90%;
  width: 2px;
  border-radius: 1px;
}
</style>
