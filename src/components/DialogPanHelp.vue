<template>
  <div>
    <div>You can navigate in three ways</div>
    <div>
      <strong>mouse</strong><br>
      <ul>
        <li><strong>drag</strong> - pans the diagram</li>
        <li><strong>shift + drag</strong> - zooms in/out</li>
        <li><strong>ctrl/cmd + drag</strong> - rotates</li>
      </ul>
      <strong>keyboard</strong><br>
      <ul>
        <li><strong>shift + arrows</strong> - pans the diagram</li>
        <li><strong>shift + +/-</strong> - zooms in/out</li>
        <li><strong>shift + 0</strong> - resets zoom</li>
        <li><strong>shift + (period)</strong> - resets rotation</li>
        <li><strong>shift + H</strong> - resets pan</li>
      </ul>
      or by using touch gestures on yout mobile device
    </div>
  </div>
</template>

<script>

export default {
  name: 'DialogPanHelp'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
