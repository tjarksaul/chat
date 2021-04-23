<style>
</style>

<script lang="ts">
  import Join from './chat/Join.svelte'
  import type { ChatState } from './chat/chatStore'
  import { ChatStore, getInitialState } from './chat/chatStore'
  import Room from './chat/Room.svelte'
  import { API } from './chat/api'
  import type { Writable } from 'svelte/store'
  import { writable } from 'svelte/store'

  const api = new API('wss://otmyj253a4.execute-api.us-east-1.amazonaws.com/dev')
  const chatState: Writable<ChatState> = writable(getInitialState())

  const chatStore = new ChatStore(api, chatState)

  api.onMessage((message) => chatStore.addMessage(message))
</script>

<main>
  {#if $chatState.connected}
    <Room
        name={$chatState.name}
        messages={$chatState.messages}
        onLeave={() => chatStore.leave()}
        onSend={message => chatStore.sendMessage(message)}
    />
  {:else}
    <Join
        name={$chatState.name}
        onJoin={name => chatStore.join(name)}
    />
  {/if}
</main>
