<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../components/KazkaCard.svelte';
	import { fade, fly } from 'svelte/transition';
</script>

{#if data}
	<div class="main-page-div">
		<div class="write-encourage" in:fly={{ y: -160, duration: 1000 }}>
			<button onclick="window.location.href = '/maisternia'">Написати казку</button>
			<p>Створюй нову неймовірну казку разом із Казкарем!</p>
		</div>

		<div class="read-finished" in:fly={{ y: -120, duration: 1000, delay: 200 }}>
			<h1>Читай завершені казки</h1>
			<div class="finished-samples">
				{#each data.kazky as kazka}
					<div class="sample">
						<KazkaCard id={kazka.id} title={kazka.title} content={kazka.content} />
					</div>
				{/each}
			</div>
			<a href="/chytaty">Більше</a>
		</div>
	</div>
{/if}

<style>
	.main-page-div {
		padding: 40px 0;
	}

	.write-encourage {
		margin: 0 0 20px 0;
	}

	.write-encourage,
	.read-finished {
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
		row-gap: 10px;
		column-gap: 90px;
		flex-wrap: wrap;
		margin-bottom: 40px;
	}
</style>
