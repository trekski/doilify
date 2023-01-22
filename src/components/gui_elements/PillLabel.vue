<template>
  <div
    class="pill_label"
    :style="{'background-color': color}"
  >
    <div><slot>label not provided</slot></div>
  </div>
</template>

<script>
export default {
  name: 'PillLabel',
  props: {
    color: {
      type: String,
      default: 'lightgray'
    }
  }
}
</script>

<style>
.pill_label {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5em;
  border-radius: 0.75em;
  padding: 0em 0.7em;
  margin: 0.3em;
}
</style>
