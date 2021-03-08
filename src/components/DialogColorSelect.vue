<template>
  <div style="text-align: center">
    <div v-for="(group, i) in allowedColors" :key="i">
      <button
        v-for="(color, j) in group" :key="j"
        class="coloricon"
        :class="{ colorSelected: initialValue === color }"
        :title="color"
        @click="colorSelected(color)"
        :style="{ background : color }"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'DialogColorSelect',
  props: ['initialValue'],
  emits: ['colorSelected'],
  data () {
    return {
      allowedColors: [
        ['black', 'dimgray', 'darkgray'],
        ['dodgerblue', 'crimson', 'gold'],
        ['darkorange', 'darkgreen', 'darkmagenta']
      ]
    }
  },
  computed: {
  },
  methods: {
    colorSelected (color) {
      this.$emit('colorSelected', color)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .coloricon {
    height: 45px;
    width: 45px;
    font-size: 0px;
    border-radius: 50%;
    padding: 0px;
    min-width: 0px;
    transition: all 0.2s;
  }
  .coloricon:hover {
    -box-shadow: 0px 0px 0px 6px var(--main-accent);
    transform: scale(1.3);
  }

  .description {
    margin: 5px;
  }
  .colorSelected {
    box-shadow: 0px 0px 0px 6px white, 0px 0px 0px 12px var(--main-accent-highlight);
  }
  .colorSelected:hover {
    box-shadow: 0px 0px 0px 6px white, 0px 0px 0px 12px #fff0;
  }
</style>
