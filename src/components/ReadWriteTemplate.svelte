<script>
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data;
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
		const new_kazky = await fetch(
			`/api/get-kazky?state=incompleted&page=${++page}&kazky_per_page=${data.kazky_per_page ?? 4}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then((res) => res.json())
			.then((res) => res.kazky);

		data.kazky = [...data.kazky, ...new_kazky];

		if (new_kazky.length === 0 || new_kazky.length < data.kazky_per_page) {
			//console.log('Більше казок немає');

			more_kazky_button.style.display = 'none';

			return;
		}
	}
</script>

<div class="page-div">
	<div class="page-description">
		<h1>{header}</h1>
		<p>{description}</p>
	</div>

	<div class="find-tools">
		<div class="rigth-find-tools">
			<label
				>Пошук
				<input type="text" />
			</label>

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
			{#if data.random_kazka}
				<slot name="rnd-kazka-btn" />
			{/if}
			<slot name="new-kazka-btn" />
		</div>
	</div>

	<div class="finished-samples">
		{#each data.kazky as kazka, i}
			{#if grid_visible}
				<div class="sample" in:scale={{ delay: 160 * i, duration: 700, start: 0.7 }}>
					<slot {kazka} />
				</div>
			{/if}
		{/each}
	</div>

	<button on:click={getMoreKazky} bind:this={more_kazky_button}>Завантажити ще</button>
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
