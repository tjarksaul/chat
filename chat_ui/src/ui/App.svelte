<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<script lang="ts">
  import Hello from './Hello.svelte';

  let count = 0;

  function increment(): void {
    count++;
  }
</script>

<main>
  <Hello count={count} />
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>

  <button on:click={increment}>Increment</button>
</main>
