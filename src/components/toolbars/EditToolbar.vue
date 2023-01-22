<template>
  <div id="editToolbar">
    <div
      v-if="show_label"
      id="infoLabel"
    >
      {{ info_label_value }}
    </div>
    <div id="Icons">
      <IconGroup
        v-for="(grp, i) in name_groups"
        :key="i"
        dir="row"
      >
        <IconButton
          v-for="(name, j) in grp"
          :key="j"
          :name="name"
          @mouseover="changeInfoLabel(name)"
          @mouseleave="changeInfoLabel()"
        />
      </IconGroup>
    </div>
  </div>
</template>

<script>
import IconButton from '../gui_elements/IconButton.vue'
import IconGroup from '../gui_elements/IconGroup.vue'

export default {
  name: 'EditToolbar',
  components: {
    IconButton: IconButton,
    IconGroup: IconGroup
  },
  data () {
    return {
      name_groups: [
        ['foo', 'bar'],
        ['button_a', 'button_b', 'ccccc']
      ],
      info_label_value: ''
    }
  },
  computed: {
    show_label () {
      return this.info_label_value !== ''
    }
  },
  methods: {
    changeInfoLabel (s = '') {
      this.info_label_value = s
    }
  }
}
</script>

<style>
#editToolbar {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: yellow solid 1px;
  /**/
  bottom: 25px;
  left: 50%;
  transform:  translateX(-50%);
  /*
  left: 25px;
  top: 50%;
  transform:  translateY(-50%);
  flex-direction: column;
  row-gap: 10px;
  */
}
#editToolbar #infoLabel {
  display: flex;
  justify-content: center;
  padding: 3px;
  border: solid fuchsia 1px;
}
#editToolbar #Icons {
  display: flex;
  column-gap: 10px;
}
</style>
