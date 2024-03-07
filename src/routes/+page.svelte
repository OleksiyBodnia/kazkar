<script>
    /** @type {import('./$types').PageData} */
	export let data;
	import KazkaPreview from '../components/KazkaPreview.svelte';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    let visible = false;

    onMount(() => {
        visible = true;
    });
</script>

{#if visible}
<div class="main-page-div">
    <div class="write-encourage" in:fly={{y: -160, duration: 1000}}>
        <button onclick="window.location.href = '/maisternia'">Написати казку</button>
        <p>Створюй нову неймовірну казку разом із Казкарем!</p>
    </div>
    
    <div class="read-finished" in:fly={{y: -120, duration: 1000, delay: 200}}>
        <h1>Читай завершені казки</h1>
            <div class="finished-samples">
                {#each data.kazky as kazka}
                    <div class="sample">
                        <KazkaPreview title={kazka.title} content={kazka.content} time_stamp={kazka.completed_at} />
                    </div>
			    {/each}
            </div>
        <button onclick="window.location.href = '/chytaty'">Більше</button>
    </div>
</div>
{/if}

<style>

    .main-page-div{
        padding: 40px 0;
    }

    .write-encourage{
        margin: 0 0 20px 0;
    }

    .write-encourage,.read-finished {
        text-align: center;
    }

    .write-encourage button {
        font-size: 1.5em;
    }

    .read-finished {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .finished-samples {
        width: 80%;
        /* display: grid;
        grid-template-columns: auto auto;
        /* grid-gap: 20px; */

        display: flex;
        align-items: center;
        justify-content: center;
        row-gap: 40px;
        column-gap: 90px;
        flex-wrap: wrap;
        margin-bottom: 40px;

    }
</style>