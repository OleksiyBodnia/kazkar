<!-- Modal dialog template -->
<script>
	import { fade, scale} from 'svelte/transition';

	export let show_info = false;
    export let outer_close = true;

	export function toggle() {
		show_info = !show_info;
	}
</script>

{#if show_info}
	<div class="backdrop" transition:fade on:click|self={() => { if (outer_close) toggle()}}>
		<div class="modal" transition:scale>
			<button class="close-button" on:click={toggle}>×</button>
			<slot />
		</div>
	</div>
{/if}

<svelte:window on:keydown={(e) => {
    if (e.key === "Escape") show_info = false;
}} />

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 101;
        width: 100%;
        height: 100%;
		display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.2);
		backdrop-filter: blur(3px);
    }

    .modal {
		padding: 2em;
		border-radius: 20px;
		max-width: 80%;
        margin: 10% auto;
        background: white;
		position: relative;
	}

    .close-button {
		position: absolute;
		top: 0.2em;
    	right: 0.5em;
		background-color: transparent;
		border: none;
		font-size: 2em;
		cursor: pointer;
	}

	.close-button:hover {
		color: var(--color-accent);
	}

	/* поки не треба */
	/* .close-button:hover {
		color: red;
	}
	 */
</style>