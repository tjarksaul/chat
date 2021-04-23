import type { Writable } from 'svelte/store'
import type { Message } from './message'
import type { API } from './api'

export interface ChatState {
  name: string
  connected: boolean
  messages: Message[]
}

const CHAT_NAME_KEY = 'chat-name'

export class ChatStore {
  constructor (
    private api: API,
    private chatState: Writable<ChatState>,
  ) {}

  join (name: string): void {
    localStorage.setItem(CHAT_NAME_KEY, name)

    this.chatState.update(state => (
      { ...state, name, connected: true }
    ))
  }

  leave (): void {
    localStorage.removeItem(CHAT_NAME_KEY)

    this.chatState.update(state => (
      { ...state, connected: false }
    ))
  }

  addMessage (message: Message) {
    this.chatState.update(state => (
      { ...state, messages: [...state.messages, message] }
    ))
  }

  sendMessage (message: Message): void {
    this.api.broadcast(message)
  }
}

export function getInitialState (): ChatState {
  const cachedName = localStorage.getItem(CHAT_NAME_KEY)

  if (cachedName) {
    return {
      name: cachedName,
      connected: true,
      messages: [],
    }
  } else {
    return {
      name: '',
      connected: false,
      messages: [],
    }
  }
}
