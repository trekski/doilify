<template>
  <div id="wrapper">
    <!-- where the doily graph will be displayed -->
    <div id="graph">
      modal: <strong>{{ modalWindow }}</strong><br />
      edit: <strong>{{ editingMode }}</strong><br />
      menu: <strong>{{ menuOpen }}</strong><br />
      menu selection: <strong>{{ menuSelection }}</strong><br />
    </div>
    <!-- placeholder for key app icons -->
    <transition name="fade">
      <div id="mainIcons" v-if="!menuOpen">
        <button id="openMenu" class="icon img" @click="toggleMenu(true)">
          <img src="icons/menu_burger_white.svg" />
        </button>
        <button id="selectTool" class="icon img" @click="changeModal('tool_select')">
          <img src="icons/select_tool_white.svg" />
        </button>
      </div>
    </transition>
    <!-- placeholder for menu -->
    <transition name="fade">
      <div id="menuWrapper" class="layer" v-if="menuOpen" @click.self="toggleMenu(false)">
        <MainMenu @menu-selected="menuAction"/>
      </div>
    </transition>
    <!-- placeholder for modal dialog windows -->
    <transition name="fade">
      <div id="modalWrapper" class="layer" v-if="modalWindow" @click.self="changeModal(false)">
        <ModalWindow @modal-result="changeOption" :modalType="modalWindow" modalButtons="OK_CANCEL"/>
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
      modalWindow: false,
      editingMode: 'crochet',
      menuOpen: false,
      menuSelection: false
    }
  },
  methods: {
    changeEditingMode (a) {
      this.editingMode = a
    },
    changeModal (a) {
      this.modalWindow = a
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
    changeOption (event) {
      console.log('received')
      console.log(event)
      this.modalWindow = false
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
