<style></style>

<script lang="ts">
  let name = ''
  export let onJoin: (name: string) => void
</script>

<div>
  <input type="text" bind:value={name}>
  <button on:click={()  => onJoin(name)}>Join</button>
</div>
