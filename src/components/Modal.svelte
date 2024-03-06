<!-- Modal dialog template -->
<script>
	import { fade, scale} from 'svelte/transition';

	let show_info = false;
    export let outer_close = true;

	export function toggleModal() {
		show_info = !show_info;
	}
</script>

{#if show_info}
	<div class="backdrop" transition:fade on:click|self={() => { if (outer_close) toggleModal()}}>
		<div class="modal" transition:scale>
			<button class="close-button" on:click={toggleModal}>×</button>
			<slot />
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
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
		max-width: 40%;
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

	/* поки не треба */
	/* .close-button:hover {
		color: red;
	}
	 */
</style>