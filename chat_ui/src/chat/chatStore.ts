import { writable } from 'svelte/store'

export interface ChatState {
  name: string
  connected: boolean
}

const CHAT_NAME_KEY = 'chat-name'

export const chatStore = writable<ChatState>(getInitialState())

export function join (state: ChatState, name: string): ChatState {
  localStorage.setItem(CHAT_NAME_KEY, name)

  return { ...state, name, connected: true }
}

export function leave (state: ChatState): ChatState {
  localStorage.removeItem(CHAT_NAME_KEY)

  return { ...state, connected: false }
}

function getInitialState (): ChatState {
  const cachedName = localStorage.getItem(CHAT_NAME_KEY)

  if (cachedName) {
    return {
      name: cachedName,
      connected: true,
    }
  } else {
    return {
      name: '',
      connected: false,
    }
  }
}

