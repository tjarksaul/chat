<script lang="ts">
  import type { Message } from './message'

  export let name: string
  export let onLeave: () => void
  export let onSend: (message: Message) => void
  export let messages: Message[]

  let text: string

  function onSubmit (event) {
    event.preventDefault()
    onSend({ name, text })
    text = ''
  }
</script>

<div>
  {#each messages as message}
    <p>
      <strong>{message.name}</strong>: {message.text}
    </p>
  {/each}
</div>

<p>Name: {name}</p>

<form on:submit={onSubmit}>
  <input type="text" bind:value={text}>
  <button type="submit">Send</button>
</form>
<div>
  <button on:click={onLeave}>Leave</button>
</div>
