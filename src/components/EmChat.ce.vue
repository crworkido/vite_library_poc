<script setup lang="ts">
import moment from 'moment'
import { reactive, computed, ref, PropType } from 'vue'
import type { Message }  from '../types/message'

const isEmpty = (val:any) => {
  let _isEmpty = true
  const valType = typeof val || 'undefined'
  switch(valType) {
    case 'undefined':
      break
    case 'string':
      _isEmpty = val.length === 0
      break
    case 'object':
      _isEmpty = Object.keys(val).length === 0
      break
    default :
      console.warn(`missing type (${valType})`)
  }
  return _isEmpty
}
/**
 * defining component properties
 **/
interface chatProps {
  messages: string,
  senderId: number,
}
const props = defineProps<chatProps>()

/**
 * defining component events
 **/
const emit = defineEmits<{
  (e: 'send-message', msg: Message): void;
  (e: 'get-file', fn: Function): void;
}>()
/**
 * defining component actions
 **/
const actions = {
  shortDate: (date: Date) => moment(date).format('LTS'),
  submitMessage: () => {
    emit('send-message',{
      message: typedMessage.value,
      createdAt: new Date('now'),
      senderId: props.senderId})
    typedMessage.value = ''
  },
  enterHandler() {
    actions.submitMessage()
  },
  attachHandler() {
    console.log('open file selector')
    const resolverFn = (fileInfo: any) => {
      console.log('we should do something with this info')
      console.log(fileInfo)
    }
emit('get-file', resolverFn)
  },
  sendHandler() {
    actions.submitMessage()
  }
}

const typedMessage = ref('')
const messageList = computed( () => {
  //web components only receive string
  if(isEmpty(props.messages)) {
    return []
  } else {
    let rv = null
    try {
      rv = JSON.parse(props.messages)
    } catch(e) {
      console.error(e)
      rv = []
    }
    return rv
  }
} )
</script>
<template>
  <div class="em-chat">
    <div class="message-list">
      <div
        v-for="msg: Message of messageList"
        class="message-container"
        :class="{'me': (msg.senderId == props.senderId) }">
        <div class="msg-baloon">
          <span> {{actions.shortDate(msg.createdAt)}} </span>
          <div style="text-align: right;">
            {{msg.message}}
          </div>
        </div>
      </div>
    </div>
    <div class="controls">
      <div class="attach-button">
        <a href="javascrip:;" @click="actions.attachHandler"><img src="/src//assets/clip.svg"/></a>
      </div>
      <div class="input-field">
        <textarea class="chat-input" v-model="typedMessage" @keyup.enter="actions.enterHandler"  />
      </div>
      <div class="send-button">
        <a href="javascrip:;" @click="actions.sendHandler"><img src="/src//assets/paper_plane.svg"/></a>

      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.em-chat {
  display: block;
  width: 100%;
  min-height: 300px;
  height: 300px;
  .message-list{
    background-color: var(--list-bgcolor, white);
    width: 100%;
    height: inherit;
    .message-container {
      padding: 5px;
      clear: both;
      .msg-baloon {
        display: block;
        float:right;
        color: var(--baloon-remote-color,white);
        padding: 8px 10px;
        font-family: Noto Sans HK;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        background-color: var(--baloon-remote-bgcolor,#EA4785);
        border-radius: 10px 10px 0px 10px;
      }
      &.me {
        .msg-baloon {
          float: left;
          color: var(--baloon-local-color,#212736);
          background-color: var(--baloon-local-bgcolor,#F4F5F8);
          border-radius: 10px 10px 10px 0px;


        }
      }

    }
  }
  .controls {
    position: relative;
    bottom: 0px;
    min-height: 40px;
    height: 40px;
    width: 100%;
    background-color: var(--controls-bgcolor, white);
    display: flex;
    .send-button,
    .attach-button {
      width: 40px;
      height: 40px;
    }
    .input-field {
      flex: 1;
      padding-left: 2px;
      padding-right: 6px;
      .chat-input {
        background: #F4F5F8;
        border-radius: 10px;
        border: none;
        width: 100%;
        min-height: 37px;
      }
    }
  }
}

</style>
