<script lang="ts">
    export let name: string;
    export let onLeave: () => void;
</script>

<p>{name}</p>
<p>
    <button on:click={onLeave}>Leave</button>
</p>