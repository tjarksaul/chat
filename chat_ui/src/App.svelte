<style>
</style>

<script lang="ts">
  import Join from './chat/Join.svelte'
  import { chatStore, join, leave, sendMessage } from './chat/chatStore'
  import Room from './chat/Room.svelte'
</script>

<main>
  {#if $chatStore.connected}
    <Room
        name={$chatStore.name}
        messages={$chatStore.messages}
        onLeave={leave}
        onSend={sendMessage}
    />
  {:else}
    <Join
        name={$chatStore.name}
        onJoin={join}
    />
  {/if}
</main>
