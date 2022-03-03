import {defineCustomElement} from 'vue'
import EmChat from '../components/EmChat.ce.vue'
const CustomEmChat = defineCustomElement(EmChat)
customElements.define('em-chat', CustomEmChat)

/**
 * testing helpers
 **/
const testMessages = []
const message1 = {"message": "test 1", "createdAt": "2022-03-03 10:00:00", "senderId": "1"}
const message2 = {"message": "test 2 very long text to make it use a lot of space", "createdAt": "2022-03-03 10:05:00", "senderId": "1"}
const message3 = {"message": "test pong", "createdAt": "2022-03-03 10:06:00", "senderId": "2"}

const allMessages = () => [message1, message2, message3]
const noMessages = () => []
const addMessageToStack = (msg) => testMessages.push(msg)
const resetStack = () => {
  while(testMessages.length > 0) {
    testMessages.pop()
  }
}
/**
 * show cases
 **/
export default {
  title: 'EmChat',
  component: EmChat,
  argTypes: {
    'senderId' : { control: { type: 'number'}},
    'messages': {control: {type: 'text'}}
  }
}

const Template = (args) => ({
  components: { CustomEmChat },
  setup() {
    return {...args}
  },
  template: '<em-chat :sender-id="senderId"  :messages="messages" @send-message="sendMessageHandler" />'
})

export const NoSettings = Template.bind({ })

export const ConversationWithReply = Template.bind({ })
ConversationWithReply.args = {
  "senderId": 2,
  "messages": JSON.stringify(allMessages())
}

export const SendMessage = Template.bind({ })
AttachButton.args = {
  "senderId": 2,
  "messages": null,
  sendMessageHander
}

