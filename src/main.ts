import {defineCustomElement} from 'vue'
import EmChat from './components/EmChat.ce.vue'
const CustomEmChat = defineCustomElement(EmChat)
customElements.define('em-chat', CustomEmChat)

//import { createApp } from 'vue'
//import App from './App.vue'

//createApp(App).mount('#app')
