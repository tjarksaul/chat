<script lang="ts">
  export let name: string
  export let onLeave: () => void
  export let onSend: (message: string) => void

  let message: string

  const messages = [
    {
      name: 'Geison',
      text: 'Hello!'
    },
    {
      name: 'Hamid',
      text: 'Hello, Hello!'
    },
  ]

  function onSubmit (event) {
    event.preventDefault()
    onSend(message)
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
  <input type="text" bind:value={message}>
  <button type="submit">Send</button>
</form>
<div>
  <button on:click={onLeave}>Leave</button>
</div>
