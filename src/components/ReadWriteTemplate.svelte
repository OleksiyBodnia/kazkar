<script>
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data;
	let kazky;
	data.kazky.then((k) => (kazky = k));
	export let random_kazka;
	export let kazky_per_page;
	export let state;
	export let header = 'Заголовок';
	export let description = 'Опис сторінки';

	let filter_selected;
	let filters = ['Найновіші', 'Найстаріші', 'Популярні', 'Непопулярні'];
	let page = 1;
	let more_kazky_button;

	let grid_visible = false;
	onMount(() => {
		grid_visible = true;
	});

	function whenFilterSelected() {}

	async function getMoreKazky() {
		more_kazky_button.textContent = 'Завантаження...';

		const new_kazky = await fetch(
			`/api/get-kazky?state=${state}&page=${++page}&kazky_per_page=${kazky_per_page ?? 4}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then((res) => res.json())
			.then((res) => res.kazky);

		kazky = [...kazky, ...new_kazky];

		more_kazky_button.textContent = 'Завантажити ще';

		if (new_kazky.length === 0 || new_kazky.length < kazky_per_page) {
			//console.log('Більше казок немає');

			more_kazky_button.style.display = 'none';

			return;
		}
	}

	async function updateKazkas() {
		// skip update if user is not on the tab
		if (document.visibilityState !== 'visible') return;

		// kazky with id and last update timestamp ('id', 'updated_at')
		const kazky_updates = await fetch(`/api/get-kazky-updates?state=${state}`).then((r) =>
			r.json().then((data) => data.kazky)
		);

		let updated_kazky = [];

		// compare local data.kazky with kazky_updates
		// if kazka is updated, fetch it from server
		for (const kazka of kazky) {
			const updated_kazka = kazky_updates.find((k) => k.id === kazka.id);
			if (updated_kazka) {
				if (updated_kazka.updated_at !== kazka.updated_at) {
					updated_kazky.push(
						await fetch(`/api/kazka/get?id=${kazka.id}`).then((r) =>
							r.json().then((data) => data.kazka)
						)
					);
				} else {
					updated_kazky.push(kazka);
				}
			}
		}

		kazky = updated_kazky;

		// console.log('kazkas updated at ' + new Date().toLocaleTimeString());
	}

	onMount(() => {
		// call updateKazkas every 5 seconds
		const interval = setInterval(updateKazkas, 5000);
		return () => clearInterval(interval);
		// updateKazkas();
	});
</script>

<div class="page-div">
	<div class="page-description">
		<h1>{header}</h1>
		<p>{description}</p>
	</div>

	<div class="find-tools">
		<div class="rigth-find-tools">
			{#if state === 'completed'}
				<label
					>Пошук
					<input type="text" />
				</label>
			{/if}

			<label
				>Фільтр
				<select bind:value={filter_selected} on:change={whenFilterSelected}>
					{#each filters as filter}
						<option value={filter}>
							{filter}
						</option>
					{/each}
				</select>
			</label>
		</div>
		<div class="left-find-tools">
			{#if random_kazka}
				<slot name="rnd-kazka-btn" />
			{/if}
			<slot name="new-kazka-btn" />
		</div>
	</div>

	{#await data.kazky}
		<p>Завантаження...</p>
	{:then}
		<div class="finished-samples">
			{#each kazky as kazka, i}
				{#if grid_visible}
					<div class="sample" in:scale={{ delay: 160 * i, duration: 700, start: 0.7 }}>
						<slot {kazka} />
					</div>
				{/if}
			{/each}
		</div>
		<button on:click={getMoreKazky} bind:this={more_kazky_button}>Завантажити ще</button>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.page-div {
		padding: 40px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.page-description {
		text-align: center;
	}

	.finished-samples {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		row-gap: 10px;
		column-gap: 90px;
		flex-wrap: wrap;
		margin-bottom: 40px;
	}

	.find-tools {
		width: 100%;
		padding: 0 30px;
		margin-top: 30px;
		margin-bottom: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.rigth-find-tools {
		display: flex;
		align-items: center;
		gap: 40px;
	}

	.left-find-tools {
		display: flex;
		align-items: center;
		gap: 25px;
	}

	/* на майбутнє: треба гатрно силізувати input, поки не шарю як */
	input {
		border: none;
		border-bottom: 1px solid black;
		background-color: transparent;
		outline: none;
	}

	input:focus {
		border-bottom: 1px solid var(--color-accent);
	}
	@media screen and (max-width: 767px) {
		.rigth-find-tools {
			flex-direction: column;
			gap: 15px;
			align-items: start;
			margin-right: 50px;
		}
		.find-tools {
			padding: 0;
		}
		.finished-samples {
			margin: 0;
		}
		.left-find-tools {
			flex-direction: column;
			gap: 15px;
			align-items: end;
		}
		input {
			width: 150px;
		}
		.page-div {
			padding: 0;
		}
	}
	@media screen and (min-width: 768px) and (max-width: 1023px) {
		.rigth-find-tools {
			flex-direction: column;
			gap: 15px;
			align-items: start;
		}
		.left-find-tools {
			flex-direction: column;
			gap: 15px;
			align-items: end;
		}
		input {
			width: 150px;
		}
	}
</style>
