<template>
  <div class="modalWindow">
    <div class="windowTitle">
      {{ title }}
    </div>
    <div class="windowContent">
      <div class="windowMessage">
        {{ message }}
      </div>
      <DialogToolSelect
        v-if="valueType==='tool_type'"
        :initial-value="dialogValue"
        @toolSelected="processNewValue"
      />
      <DialogColorSelect
        v-if="valueType==='color'"
        :initial-value="dialogValue"
        @colorSelected="processNewValue"
      />
      <DialogStitchTypeSelect
        v-if="valueType==='stitch_type'"
        :initial-value="dialogValue"
        @stitchTypeSelected="processNewValue"
      />
    </div>
    <div
      v-if="buttonsVisible"
      class="windowButtons"
    >
      <button
        v-if="OKvisible"
        class="icon"
        @click="modalOK"
      >
        OK
      </button>
      <button
        v-if="CANCELvisible"
        class="icon"
        @click="modalCancel"
      >
        CANCEL
      </button>
    </div>
  </div>
</template>

<script>
import DialogToolSelect from './DialogToolSelect.vue'
import DialogColorSelect from './DialogColorSelect.vue'
import DialogStitchTypeSelect from './DialogStitchTypeSelect.vue'

export default {
  name: 'ModalWindow',
  components: {
    DialogToolSelect: DialogToolSelect,
    DialogColorSelect: DialogColorSelect,
    DialogStitchTypeSelect: DialogStitchTypeSelect
  },
  props: {
    outputParamName: String, // what is the parameter this modal is supposed to update
    initialValue: [String, Number, Boolean, Object], // what was the initial vlaue upon modal opened
    valueType: String, // type of the initial value determines what dialog is shown
    message: String, // UX
    title: String, // UX
    buttons: String // how does the modal behave
  },
  emits: ['modalResult'],
  data () {
    return {
      dialogValue: this.initialValue
    }
  },
  computed: {
    OKvisible () {
      return (this.buttons === 'OK' || this.buttons === 'OK_CANCEL')
    },
    CANCELvisible () {
      return (this.buttons === 'CANCEL' || this.buttons === 'OK_CANCEL')
    },
    buttonsVisible () {
      return (this.buttons !== 'NONE')
    }
  },
  methods: {
    // CANCEL was clicked => clsoe modal without returning anything
    modalCancel () {
      this.$emit('modalResult', false)
    },
    // OK was clicked => send response (=latest selected value)
    modalOK () {
      this.sendResponse()
    },
    // vlaue was selected => store it and (if no OK button) emit it instantly
    processNewValue (event) {
      this.dialogValue = event
      if (this.buttons === 'NONE') {
        this.sendResponse()
      }
    },
    // communicate selected vzlaue to parent(s)
    sendResponse () {
      this.$emit(
        'modalResult',
        {
          param: this.outputParamName,
          value: this.dialogValue
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.modalWindow {
  min-width: 300px;
  max-width: 80%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  background: white;
  color: var(--text-accent-highlight);
  font-weight: normal;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 5px 5px 5px gray;
}

.windowTitle {
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background: var(--main-accent);
  border-radius: 10px 10px 0px 0px;
  color: var(--text-accent);
  min-height: 10px;
}
.windowMessage {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.windowContent {
  padding: 10px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.windowContent::-webkit-scrollbar {
    width: 8px;
}

.windowContent::-webkit-scrollbar-corner {
    visibility: hidden;
}

.windowContent::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: lightgray;
}

.windowButtons {
  text-align: center;
  min-height: 10px;
  width: 100%;
  padding: 0px;
}

</style>
