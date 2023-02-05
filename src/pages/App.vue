<template>
  <div id="wrapper">
    <!-- where the doily graph will be displayed -->
    <div style="position: absolute; left:60px;">
      v. 0.9.23
    </div>

    <MainGraph
      ref="MainGraph"
      :app-state="appState"
      @stitch-selected="changeSelectedStitch"
    />

    <button
      style="position:absolute; left:110px; visibility: hidden"
      @click="checkNewAppVer"
    >
      check for new versions
    </button>
    <button
      v-if="NewSWAvailable"
      style="position:absolute; left:320px;"
    >
      new verion available
    </button>

    <!-- placeholder for key app icons - (almost) const. visible -->
    <transition name="fade">
      <div
        v-if="!menuOpen"
        id="mainIcons"
      >
        <button
          id="openMenu"
          class="icon img shadow2px"
          title="open the main menu"
          @click="toggleMenu(true)"
        >
          <img src="icons/menu_burger_white.svg">
        </button>
        <button
          id="selectTool"
          class="icon img shadow2px"
          title="select the tool you want to use"
          @click="changeModal('edit_mode', appState.editingMode, 'tool_type', 'NONE', 'Pick a tool', 'Toolbox' )"
        >
          <img src="icons/select_tool_white.svg">
        </button>
        <button
          id="selectColor"
          class="icon img shadow2px"
          title="select stitch color"
          style="visibility: hidden"
          @click="changeModal('main_color', appState.mainStitchColor, 'color', 'NONE', 'Pick main stitch color', 'Select Color' )"
        >
          <img src="icons/select_tool_white.svg">
        </button>
        <button
          id="selectStitchType"
          class="icon img shadow2px"
          title="select stitch type"
          style="visibility: hidden"
          @click="changeModal('main_stitch', appState.mainStitchType, 'stitch_type', 'NONE', '', 'Select Stitch' )"
        >
          <img src="icons/select_tool_white.svg">
        </button>

        <button
          id="selectCH"
          class="icon shadow2px"
          title="make stitch"
          :class="{active : appState.mainStitchType === 'ch'}"
          @click="selectStich('ch')"
        >
          <strong>CH</strong>
        </button>
        <button
          id="selectDC"
          class="icon shadow2px"
          title="make stitch"
          :class="{active : appState.mainStitchType === 'dc'}"
          @click="selectStich('dc')"
        >
          <strong>DC</strong>
        </button>
        <button
          id="selectSL"
          class="icon shadow2px"
          title="make stitch"
          :class="{active : appState.mainStitchType === 'slst'}"
          @click="selectStich('slst')"
        >
          <strong>SLST</strong>
        </button>

        <button
          id="makeStitch"
          class="icon shadow2px"
          title="make stitch"
          @click="makeStitch()"
        >
          <strong>M</strong>
        </button>
        <button
          id="unmakeStitch"
          class="icon shadow2px"
          title="unmake stitch"
          @click="unmakeStitch()"
        >
          <strong>U</strong>
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
import MainMenu from '../components/MainMenu.vue'
import ModalWindow from '../components/ModalWindow.vue'
// import MockGraph from './components/MockGraph.vue'
import MainGraph from '../components/MainGraph.vue'

export default {
  name: 'App',
  components: {
    MainMenu: MainMenu,
    ModalWindow: ModalWindow,
    // MockGraph: MockGraph
    MainGraph: MainGraph
  },
  data () {
    return {
      // PWA refresh flags
      SWRegistration: null,
      NewSWAvailable: false,
      SWRefreshing: false,
      // is there a modal dialog window open, and if so, what is it
      ModalWindowParams: {
        outputParamName: null,
        initialValue: null,
        valueType: null,
        message: null,
        title: null,
        buttons: 'OK',
        show: false
      },
      // what is the user doing a.t.m.
      appState: {
        editingMode: 'crochet',
        mainStitchColor: 'black',
        mainStitchType: 'ch'
      },
      // is the main menu currently open
      menuOpen: false,
      menuSelection: false
    }
  },
  created () {
    //this.setupAppVer()
  },
  methods: {
    // // PWA refresh info
    // async setupAppVer () {
    //   this.SWRegistration = await navigator.serviceWorker.getRegistration()
    // },
    // async checkNewAppVer () {
    //   this.NewSWAvailable = false
    //   if (this.SWRegistration === null) {
    //     console.log('no registered service worker')
    //     return
    //   }
    //   const registration = await this.SWRegistration.update()
    //   if (registration === null) {
    //     this.SWRegistration = registration
    //     if (registration.installing !== null) {
    //       registration.installing.addEventListener(
    //         'statechange', () => {
    //           if (registration.waiting) {
    //             this.NewSWAvailable = true
    //           }
    //         }
    //       )
    //     } else if (registration.waiting !== null) {
    //       this.NewSWAvailable = true
    //     }
    //   }
    // },
    selectStich (t) {
      this.appState.mainStitchType = t
      this.$refs.MainGraph.refocus()
    },
    // testGraph
    testGraph () {
      alert('a')
    },
    log (a) {
      console.log(a)
      console.log(this.$refs.MainGraph.$refs.graphDoily.stitches.length)
    },
    // show/hide the main menu
    makeStitch () {
      this.$refs.MainGraph.$refs.graphDoily.makeStitch()
      this.$refs.MainGraph.refocus()
    },
    unmakeStitch () {
      this.$refs.MainGraph.$refs.graphDoily.unmakeStitch()
      this.$refs.MainGraph.refocus()
    },
    toggleMenu (a) {
      if (typeof a === 'undefined') {
        this.menuOpen = !this.menuOpen
      } else {
        this.menuOpen = Boolean(a)
      }
    },
    // react to selected menu action
    menuAction (event) {
      this.menuOpen = false
      this.menuSelection = event
      if (event === 'panHelp') this.changeModal('none', null, 'pan_help', 'OK', null, 'help on navigation')
      this.$refs.MainGraph.refocus()
    },
    // manage display of modal dialog windows
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
    // react to evetns emitted by the modal window
    processModalResponse (event) {
      this.changeModal()
      switch (event.param) {
        case 'edit_mode' : this.appState.editingMode = event.value; break
        case 'main_color' : this.appState.mainStitchColor = event.value; break
        case 'main_stitch' : this.appState.mainStitchType = event.value; break
        default: this.appState.editingMode = 'crochet'
      }
      this.$refs.MainGraph.refocus()
    },
    changeSelectedStitch (event) {
      switch (event) {
        case 1 : this.appState.mainStitchType = 'ch'; break
        case 2 : this.appState.mainStitchType = 'dc'; break
        case 3 : this.appState.mainStitchType = 'slst'; break
      }
      this.$refs.MainGraph.refocus()
    }
  }
}
</script>

<style>
#app {
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

button.active {
  color: var(--text-highlight-accent);
  background: var(--main-accent-highlight);
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
  outline-offset: -1px;
  height: 100%;
}

#wrapper .layer {
  position: absolute;
  top: 0px;
  left: 0px;
  outline-offset: -5px;
  width: 100%;
  height: 100%;
  background: #0005;
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
#selectStitchType {
  position: absolute;
  bottom: 60px;
  left: 0px;
}
#selectColor {
  position: absolute;
  bottom: 60px;
  left: 50px;
}
#testGraph {
  position: absolute;
  bottom: 0px;
  left: 100px;
}

#selectCH {
  position: absolute;
  bottom: 0px;
  left: 10px;
  width: 40px;
  height: 40px;
}

#selectDC {
  position: absolute;
  bottom: 0px;
  left: 70px;
  width: 40px;
  height: 40px;
}

#selectSL {
  position: absolute;
  bottom: 0px;
  left: 130px;
  width: 40px;
  height: 40px;
}

#makeStitch {
  position: absolute;
  bottom: 0px;
  left: 210px;
  width: 40px;
  height: 40px;
}

#unmakeStitch {
  position: absolute;
  bottom: 0px;
  left: 270px;
  width: 40px;
  height: 40px;
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
