import {defineCustomElement} from 'vue'
import VueEmChat from './components/EmChat.ce.vue'
export const EmChat = defineCustomElement(VueEmChat)

export function register() {
  customElements.define('em-chat', EmChat)
}
/*
export default {
  install: (app, options) => {
    app.component("EmChat", CustomEmChat)
    customElements.define('em-chat', CustomEmChat)
  }
}
*/
