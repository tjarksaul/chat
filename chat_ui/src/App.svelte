<style>
</style>

<script lang="ts">
    import Join from './chat/Join.svelte'
    import {chatStore, join, leave} from "./chat/chatStore";
    import Room from "./chat/Room.svelte";
</script>

<main>
    {#if $chatStore.connected}
        <Room name={$chatStore.name} onLeave={() => chatStore.update(leave)} />
    {:else}
        <Join name={$chatStore.name} onJoin={name => chatStore.update((state) => join(state, name))} />
    {/if}
</main>
