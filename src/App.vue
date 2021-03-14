<template>
  <div id="wrapper">
    <!-- where the doily graph will be displayed -->
    <div id="graph">
      modal: <strong>{{ ModalWindowParams.outputParamName }}</strong><br>
      color: <strong>{{ appState.mainStitchColor }}</strong><br>
      tool: <strong>{{ appState.editingMode }}</strong><br>
      stitch: <strong>{{ appState.mainStitchType }}</strong><br>
      menu: <strong>{{ menuOpen }}</strong><br>
      menu selection: <strong>{{ menuSelection }}</strong><br>
    </div>
    <!-- placeholder for key app icons -->
    <transition name="fade">
      <div
        v-if="!menuOpen"
        id="mainIcons"
      >
        <button
          id="openMenu"
          class="icon img shadow2px"
          @click="toggleMenu(true)"
        >
          <img src="icons/menu_burger_white.svg">
        </button>
        <button
          id="selectTool"
          class="icon img shadow2px"
          @click="changeModal('edit_mode', appState.editingMode, 'tool_type', 'NONE', 'Pick a tool', 'Toolbox' )"
        >
          <img src="icons/select_tool_white.svg">
        </button>
        <button
          id="selectColor"
          class="icon img shadow2px"
          @click="changeModal('main_color', appState.mainStitchColor, 'color', 'NONE', 'Pick main stitch color', 'Select Color' )"
        >
          <img src="icons/select_tool_white.svg">
        </button>
        <button
          id="selectStitchType"
          class="icon img shadow2px"
          @click="changeModal('main_stitch', appState.mainStitchType, 'stitch_type', 'NONE', '', 'Select Stitch' )"
        >
          <img src="icons/select_tool_white.svg">
        </button>
      </div>
    </transition>
    <!-- placeholder for menu -->
    <transition name="fade">
      <div
        v-if="menuOpen"
        id="menuWrapper"
        class="layer"
        @click.self="toggleMenu(false)"
      >
        <MainMenu @menu-selected="menuAction" />
      </div>
    </transition>
    <!-- placeholder for modal dialog windows -->
    <transition name="fade">
      <div
        v-if="ModalWindowParams.show"
        id="modalWrapper"
        class="layer"
        @click.self="changeModal()"
      >
        <ModalWindow
          v-bind="ModalWindowParams"
          @modal-result="processModalResponse"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue'
import ModalWindow from './components/ModalWindow.vue'

export default {
  name: 'App',
  components: {
    MainMenu: MainMenu,
    ModalWindow: ModalWindow
  },
  data () {
    return {
      ModalWindowParams: {
        outputParamName: null,
        initialValue: null,
        valueType: null,
        message: null,
        title: null,
        buttons: 'OK',
        show: false
      },
      appState: {
        editingMode: 'crochet',
        mainStitchColor: 'black',
        mainStitchType: 'ch'
      },
      menuOpen: false,
      menuSelection: false
    }
  },
  methods: {

    changeEditingMode (a) {
      this.editingMode = a
    },

    changeModal (output = null, initval = null, valtype = null, buttons = null, msg = null, title = null) {
      // hide the modal
      if (!output && !msg) {
        this.ModalWindowParams = {
          outputParamName: null,
          initialValue: null,
          valueType: null,
          message: null,
          title: null,
          buttons: 'OK',
          show: false
        }
      // open a new modal
      } else {
        this.ModalWindowParams = {
          outputParamName: output,
          initialValue: initval,
          valueType: valtype,
          message: msg,
          title: title,
          buttons: buttons,
          show: true
        }
      }
    },

    toggleMenu (a) {
      if (typeof a === 'undefined') {
        this.menuOpen = !this.menuOpen
      } else {
        this.menuOpen = Boolean(a)
      }
    },
    menuAction (event) {
      this.menuOpen = false
      this.menuSelection = event
    },

    processModalResponse (event) {
      this.changeModal()
      switch (event.param) {
        case 'edit_mode' : this.appState.editingMode = event.value; break
        case 'main_color' : this.appState.mainStitchColor = event.value; break
        case 'main_stitch' : this.appState.mainStitchType = event.value; break
        default: this.appState.editingMode = 'crochet'
      }
    }
  }
}
</script>

<style>
#app {
  outline: 1px solid red;
  outline-offset: -1px;
  margin: 0px;
  padding: 0px;
  height: 100%;
}

html, body
{
    height: 100%;
    margin: 0px;
    font-family: sans-serif;
    --main-accent: orange;
    --main-accent-highlight: gold;
    --text-accent: white;
    --text-accent-highlight: DarkGoldenRod;
}

button {
  background: var(--main-accent);
  border: none;
  padding: 5px 5px;
  margin: 10px;
  border-radius: 5px;
  color: var(--text-accent);
  font-weight: bold;
  outline: none;
  min-width: 50px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

button:hover {
  color: var(--text-highlight-accent);
  background: var(--main-accent-highlight);
}

button.img{
  font-size: 0px;
  min-width: 0px;
}

#wrapper {
  position: relative;
  outline: solid 1px red;
  outline-offset: -1px;
  height: 100%;
}

#wrapper .layer {
  position: absolute;
  top: 0px;
  left: 0px;
  outline: yellow solid 1px;
  outline-offset: -5px;
  width: 100%;
  height: 100%;
  background: #0005;
}

#graph {
  padding: 50px;
}

#openMenu {
  position: absolute;
  top: 0px;
  left: 0px;
}

#selectTool {
  position: absolute;
  top: 0px;
  right: 0px;
}

.shadow5px{
  box-shadow: 5px 5px 5px gray;
}

.shadow2px{
  box-shadow: 2px 2px 5px gray;
}

.fade-enter-active{
  transition: all .2s 0s ease;
}
.fade-leave-active{
  transition: all .2s .1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#menuWrapper.fade-enter-from > *,
#menuWrapper.fade-leave-to > * {
  transform:  translateX(-300px);
}
#menuWrapper.fade-enter-active > *{
  transition: all .2s 0s ease;
}
#menuWrapper.fade-leave-active > *{
  transition: all .2s .1s ease;
}

#modalWrapper.fade-enter-from > *,
#modalWrapper.fade-leave-to > * {
  transform: translate(-50%, -50%) scale(0.5);
}
#modalWrapper.fade-enter-active > *{
  transition: all .2s 0s ease;
}
#modalWrapper.fade-leave-active > *{
  transition: all .2s .1s ease;
}

</style>
