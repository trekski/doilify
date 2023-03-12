import { createApp } from "vue";
import { createPinia } from 'pinia'
import GUITets from "./GUITests.vue";

const pinia = createPinia()
const app = createApp(GUITets)

// import './registerServiceWorker'

app.use(pinia)
app.mount("#app");
