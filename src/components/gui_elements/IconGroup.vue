<template>
  <div :class="['icon_group', dir]">
    <slot>
      no buttons provided
    </slot>
  </div>
</template>

<script>
export default {
  name: 'IconGroup',
  props: {
    dir: {
      type: String,
      default: 'row'
    }
  }
}
</script>

<style>
.icon_group {
  border: palevioletred solid 1px;
  background: grey;
  display: flex;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
}
.column {
  flex-direction: column;
  row-gap: 5px;
}
.row {
  flex-direction: row;
  column-gap: 5px;
}
</style>
