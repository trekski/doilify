<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 7px;
  min-width: 70px;
  color: var(--color-main);
  background: var(--color-background-high1);
  border: none;
  border-radius: 3px;
}
button:hover {
  color: var(--color-main-high);
  background: var(--color-background-high2);
}
</style>
