<script>
    import KazkaCard from "./KazkaCard.svelte"

    export let kazky;
</script>

<div class="">
    {#each kazky as kazka}
        <KazkaCard state="completed" {kazka} />
    {/each}
</div>


<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        /* flex-direction: column; */
        column-gap: 90px;
        flex-wrap: wrap;
        border: 2px solid black;
        border-radius: 10px;
        padding: 20px;
        width: 800px;
    }
</style>