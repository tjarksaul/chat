import type { Message } from './message'

export class API {
  private socket: WebSocket
  private onMessageCallback?: (message: Message) => void

  constructor(serverUrl: string) {
    this.socket = new WebSocket(serverUrl)

    this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data)

      const { name, message } = JSON.parse(event.data)

      this.onMessageCallback?.({ name,text:  message })
    })
  }

  public onMessage(callback: (message: Message) => void) {
    this.onMessageCallback = callback
  }

  public broadcast({ name, text }: Message): void {
    const action = { action: 'postMessage', data: { name: name, message: text } }
    const serializedMessage = JSON.stringify(action)
    this.socket.send(serializedMessage)
  }
}
