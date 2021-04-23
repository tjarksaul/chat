import { writable } from 'svelte/store'
import type { Message } from './message'
import {broadcast} from "./websocket";

export interface ChatState {
  name: string
  connected: boolean
  messages: Message[]
}

const CHAT_NAME_KEY = 'chat-name'

export const chatStore = writable<ChatState>(getInitialState())

export function join (name: string): void {
  localStorage.setItem(CHAT_NAME_KEY, name)

  chatStore.update(state => (
    { ...state, name, connected: true }
  ))
}

export function leave (): void {
  localStorage.removeItem(CHAT_NAME_KEY)

  chatStore.update(state => (
    { ...state, connected: false }
  ))
}

export function addMessage(message: Message) {
  chatStore.update(state => (
    {...state, messages: [...state.messages, message]}
  ))
}

export function sendMessage (message: Message): void {
  broadcast(message)
}

function getInitialState (): ChatState {
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

