<style>
  :global(html),
  :global(body) {
    padding: 0;
    font-family: 'Share Tech Mono', monospace;
  }

  :global(button),
  :global(input) {
    margin: 0;
  }

  main {
    height: 100%;
  }
</style>

<script lang="ts">
  import Join from './chat/Join.svelte'
  import Room from './chat/Room.svelte'
  import type { Writable } from 'svelte/store'
  import type { ChatState } from './chat/chatStore'
  import { writable } from 'svelte/store'
  import { ChatStore, getInitialState } from './chat/chatStore'
  import { API } from './chat/api'

  const api = new API('wss://otmyj253a4.execute-api.us-east-1.amazonaws.com/dev')
  const chatState: Writable<ChatState> = writable(getInitialState())

  const chatStore = new ChatStore(api, chatState)

  api.onMessage((message) => chatStore.addMessage(message))
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
</svelte:head>

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
