<template>
  <svg xmlns="http://www.w3.org/2000/svg">
    <g id="myDot" width="10" height="10" viewBox="0 0 2 2">
      <circle cx="1" cy="1" r="1" />
    </g>
    <g id="myDot2" width="10" height="10" viewBox="2 2 2 2">
      <circle cx="3" cy="3" r="1" />
    </g>
    <symbol
      id="symbol1865"
      viewBox="25.92 60.132 30 30"
      preserveAspectRatio="none"
    >
      <rect
        class="hide"
        x="25.924"
        y="60.132"
        width="30"
        height="30"
        fill="green"
      />
      <path
        class="show"
        d="m33.2 67.6c-3.10 0.79-7.26 7.89-0.80 11.04 6.43 3.2 10.829-1.09 11.78 1.9755 0.95118 3.0731 9.585 0.95118 6.5851-3.8779-2.9999-4.8291-3.947-9.6206-8.3412-9.2192s-6.1165-0.72133-9.2192 0.07317z"
      />
    </symbol>
  </svg>
</template>

<script>
export default {
  name: "SvgIcons",
};
</script>

<style>
.show {
  fill: inherit;
}
.show.accent {
  fill: currentColor;
}
.hide {
  fill-opacity: 0;
}
</style>
