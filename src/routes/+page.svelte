<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '@components/KazkaCard.svelte';
	import { fly } from 'svelte/transition';
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
				{#await data.kazky}
					<p>Завантаження...</p>
				{:then kazky}
					{#each kazky as kazka}
						<div class="sample" in:fly|global={{ y: -120, duration: 1000, delay: 0 }}>
							<KazkaCard state={'completed'} {kazka} />
						</div>
					{/each}
					<a href="/chytaty" class="main-page-link">Більше</a>
				{:catch}
					<p>Помилка завантаження казок</p>
				{/await}
			</div>
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

	.read-finished {
		margin-top: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.finished-samples {
		width: 80%;
		display: flex;
		align-items: center;
		justify-content: center;
		row-gap: 10px;
		column-gap: 90px;
		flex-wrap: wrap;
		margin-bottom: 40px;
	}

	.sample {
		text-align: start;
	}

	.main-page-link {
		background-color: var(--color-white);
		color: var(--color-black);
		text-align: center;
		border: 2px solid var(--color-border);
		border-radius: 8px;
		cursor: pointer;
		padding: 2px 8px;
	}

	.main-page-link:hover {
		background-color: var(--color-accent);
		color: white;
		border: 2px solid var(--color-accent);
		cursor: pointer;
	}
</style>
