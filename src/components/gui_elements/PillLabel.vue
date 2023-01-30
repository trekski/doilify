<template>
  <div
    class="pill_label"
    :style="{'background-color': this.color, 'color' : 'gray'}"
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
      default: 'rgb(240,240,240)'
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
  margin: 0.5em;
  font-size: 13px;
  font-style: italic;
  opacity: 0.7;
}
</style>
