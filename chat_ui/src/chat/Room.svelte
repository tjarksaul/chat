<script lang="ts">
  export let name: string
  let message: string
  export let onLeave: () => void
  export let onSend: (message: string) => void

  function onSubmit (event) {
    event.preventDefault()
    onSend(message)
  }
</script>

<p>{name}</p>
<form on:submit={onSubmit}>
  <p>
    <input type="text" bind:value={message}>
    <button type="submit">Send</button>
  </p>
</form>
<p>
  <button on:click={onLeave}>Leave</button>
</p>
