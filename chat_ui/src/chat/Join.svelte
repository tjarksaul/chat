<style></style>

<script lang="ts">
    export let name = ''
    export let onJoin: (name: string) => void

    function onSubmit(event) {
      event.preventDefault();
      onJoin(name);
    }
</script>

<div>
    <form on:submit={onSubmit}>
        <input type="text" bind:value={name}>
        <button type="submit">Join</button>
    </form>
</div>
