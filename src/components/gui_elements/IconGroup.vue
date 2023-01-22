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
  background:whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 5px 5px 12px -5px darkgrey;
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
