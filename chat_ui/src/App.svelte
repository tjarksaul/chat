<style>
</style>

<script lang="ts">
  import Join from './join/Join.svelte'
</script>

<main>
  <Join onJoin={name => console.log(name)} />
</main>
