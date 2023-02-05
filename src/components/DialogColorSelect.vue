<template>
  <div style="text-align: center">
    <div v-for="(group, i) in allowedColors" :key="i">
      <button
        v-for="(item, j) in group"
        :key="j"
        class="coloricon"
        :class="{ colorSelected: initialValue === item.color }"
        :title="item.name"
        :style="{ background: item.color }"
        @click="colorSelected(item.color)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogColorSelect",
  props: {
    initialValue: {
      type: String,
      default: "black",
    },
  },
  emits: ["colorSelected"],
  data() {
    return {
      allowedColors: [
        [
          { color: "black", name: "black" },
          { color: "dimgray", name: "dark gray" },
          { color: "darkgray", name: "light gray" },
        ],
        [
          { color: "dodgerblue", name: "blue" },
          { color: "crimson", name: "red" },
          { color: "gold", name: "yello" },
        ],
        [
          { color: "#ff9900", name: "orange" },
          { color: "forestgreen", name: "green" },
          { color: "mediumorchid", name: "purple" },
        ],
      ],
    };
  },
  computed: {},
  methods: {
    colorSelected(color) {
      this.$emit("colorSelected", color);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.coloricon {
  height: 50px;
  width: 50px;
  font-size: 0px;
  border-radius: 50%;
  padding: 0px;
  min-width: 0px;
  transition: all 0.2s;
  margin: 7px;
}

.coloricon:hover {
  -box-shadow: 0px 0px 0px 6px var(--main-accent);
  transform: scale(1.3);
}

.description {
  margin: 5px;
}

.colorSelected {
  box-shadow: 0px 0px 0px 4px white,
    0px 0px 0px 8px var(--main-accent-highlight);
}

.colorSelected:hover {
  box-shadow: 0px 0px 0px 4px white, 0px 0px 0px 8px #fff0;
}
</style>
