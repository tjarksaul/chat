import type { Message } from './message'
import { addMessage } from './chatStore'

const serverUrl = 'wss://otmyj253a4.execute-api.us-east-1.amazonaws.com/dev'
export const socket = new WebSocket(serverUrl)

socket.addEventListener('message', (event) => {
  console.log('Message from server ', event.data)

  const { name, message } = JSON.parse(event.data)

  addMessage({ name: name ?? 'Error', text: message })
})

export function broadcast ({ name, text }: Message): void {
  const action = { action: 'postMessage', data: { name: name, message: text } }
  const serializedMessage = JSON.stringify(action)
  socket.send(serializedMessage)
}
