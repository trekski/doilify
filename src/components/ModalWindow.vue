<template>
  <div class="modalWindow">
    <div class="windowTitle">
      {{ title }}
    </div>
    <div class="windowContent">
      <DialogToolSelect v-if="modalType==='tool_select'" />
      <div v-if="modalType==='color_select'">whoa!</div>
    </div>
    <div class="windowButtons" v-if="OKvisible||CANCELvisible">
      <button class="icon" @click="modalOK" v-if="OKvisible">OK</button>
      <button class="icon" @click="modalCancel" v-if="CANCELvisible">CANCEL</button>
    </div>
  </div>
</template>

<script>
import DialogToolSelect from './DialogToolSelect.vue'
export default {
  name: 'ModalWindow',
  emits: ['modalResult'],
  components: {
    DialogToolSelect: DialogToolSelect
  },
  data () {
    return {
      text: 'modal clicked something',
      parameterName: '',
      parameterValue: ''
    }
  },
  props: ['modalType', 'modalButtons'],
  methods: {
    modalCancel () {
      this.$emit('modalResult', false)
    },
    modalOK () {
      this.$emit(
        'modalResult',
        {
          parameterName: this.parameterName,
          parameterValue: this.parameterValue
        }
      )
    }
  },
  computed: {
    title () {
      switch (this.modalType) {
        case 'tool_select':
          return 'Select editing tool'
        default:
          return 'Dialog window'
      }
    },
    OKvisible () {
      return (this.modalButtons === 'OK' || this.modalButtons === 'OK_CANCEL')
    },
    CANCELvisible () {
      return (this.modalButtons === 'CANCEL' || this.modalButtons === 'OK_CANCEL')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.modalWindow {
  min-width: 300px;
  max-width: 80%;
  min-height: 200px;
  max-height: 80%;
  background: white;
  color: var(--text-accent-highlight);
  font-weight: normal;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.windowTitle {
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background: var(--main-accent);
  border-radius: 10px 10px 0px 0px;
  color: var(--text-accent);
}

.windowContent {
  margin: 10px;
}

.windowButtons {
  text-align: center;
  width: 100%;
  margin: 0px;
}

</style>
