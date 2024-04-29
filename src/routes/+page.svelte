<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../components/KazkaCard.svelte';
	import { fly } from 'svelte/transition';
	import { combineRechennia } from '$lib/utils';
	import { onMount } from 'svelte';
	let content_visible = false;
	onMount(() => {
		content_visible = true;
	});
</script>

{#if content_visible}
	<div class="main-page-div">
		<div class="write-encourage" in:fly={{ y: -160, duration: 1000 }}>
			<a href="/maisternia" class="main-page-link" style="font-size: 24px;">Написати казку</a>
			<p>Створюй нову неймовірну казку разом із Казкарем!</p>
		</div>

		<div class="read-finished" in:fly={{ y: -120, duration: 1000, delay: 200 }}>
			<h1>Читай завершені казки</h1>
			<div class="finished-samples">
				{#each data.kazky as kazka}
					<div class="sample">
						<KazkaCard
							id={kazka.id}
							state={'completed'}
							title={kazka.title}
							content={combineRechennia(kazka.rechennia)}
						/>
					</div>
				{/each}
			</div>
			<a href="/chytaty" class="main-page-link">Більше</a>
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
	.main-page-link {
		background-color: white;
		text-align: center;
		border: 2px solid;
		border-radius: 8px;
		cursor: pointer;
		padding: 2px 8px;
	}

	.main-page-link:hover {
		background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
