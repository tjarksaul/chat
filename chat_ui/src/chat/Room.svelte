<style>
  .room {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .top-bar {
    border-bottom: 1px gray solid;
    background-color: #59becc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .messages {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
  }

  form {
    display: flex;
  }

  input {
    flex-grow: 1;
  }
</style>

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

<div class="room">

  <div class="top-bar">
    <div>
      Connected as: <strong>{name}</strong>
    </div>
    <div>
      <button on:click={onLeave}>Leave</button>
    </div>
  </div>

  <div class="messages">
    <div>
      {#each messages as message}
        <p>
          <strong>{message.name}</strong>: {message.text}
        </p>
      {/each}
    </div>
  </div>

  <div class="bottom-bar">
    <form on:submit={onSubmit}>
      <input type="text" placeholder="Your message" bind:value={text}>
      <button type="submit">Send</button>
    </form>
  </div>

</div>
