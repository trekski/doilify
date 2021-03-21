<template>
  <div class="menuPane">
    <div class="menuHeader">
      <button
        class="img"
        @click="menuSelected()"
      >
        <img src="icons/close_x_white.svg">
      </button>
      <div>MENU</div>
    </div>
    <div class="menuList">
      <div
        class="menuItem"
        @click="menuSelected('panHelp')"
      >
        help with Zoom/Pan
      </div>
      <div
        class="menuItem"
        @click="menuSelected('foo')"
      >
        foo
      </div>
      <div
        class="menuItem"
        @click="menuSelected('bar')"
      >
        bar
      </div>
    </div>
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
.menuPane {
  min-width: 250px;
  max-width:30%;
  height: 100%;
  background: white;
  color: var(--text-accent-highlight);
  font-weight: bold;
  box-shadow: 5px 0px 5px gray;
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

.menuHeader {
  background: var(--main-accent);
  color: var(--text-accent);
}

.menuHeader * {
  vertical-align: middle;
}

.menuHeader div {
  font-size: 130%;
  width: 0px;
  display:  inline-block;
}

</style>
