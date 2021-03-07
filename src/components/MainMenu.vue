<template>
  <div id="menuPane">
    <button class="icon" @click="menuSelected()">
      <img src="icons/close_x_white.svg" />
    </button>
    <div class="menuItem" @click="menuSelected('foo')">foo</div>
    <div class="menuItem" @click="menuSelected('bar')">bar</div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  emits: ['menuSelected'],
  methods: {
    menuSelected (opt = false) {
      this.$emit('menuSelected', opt)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#menuPane {
  min-width: 300px;
  max-width: 50%;
  height: 100%;
  background: var(--main-accent);
  color: var(--text-accent);
  color: white;
  font-weight: bold;
}

.menuItem {
  margin: 5px;
  padding: 5px;
  padding-left: 15px;
  transition: background 0.1s, color 0.1s;
  border-radius: 5px;
}

.menuItem:hover {
  background: var(--main-accent-highlight);
  color: var(--text-accent-highlight);
}

</style>
