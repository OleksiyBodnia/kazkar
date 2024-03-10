<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaPreview from '../../components/KazkaPreview.svelte';

	let filter_selected;
	let filters = ["Найновіші", "Найстаріші", "Популярні", "Непопулярні"]

	function whenFilterSelected () {
		
	}
</script>

<div class="write-page-div">
	<div class="page-description">
		<h1>Майстерня Казкаря</h1>
		<p>Тут ви можете взяти участь у написанні казок! Правила, та та та і тому подібне</p>
	</div>

	<div class="find-tools">
		<div class="rigth-find-tools">
			<label>Пошук
				<input type="text">
			</label>
			
			<label>Фільтр
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
			<button>Випадкова казка</button>
			<button>Розпочати нову казку</button>
		</div>
	</div>

	<div class="finished-samples">
		{#each data.kazky as kazka}
			<div class="sample">
				<KazkaPreview title={kazka.title} content={kazka.content} kazka_type={"Progress"} />
			</div>			
		{/each}
	</div>
</div>

<style>
	.write-page-div{
        padding: 40px 0;
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
	.find-tools{
		padding: 0 30px;
		margin-top: 30px;
		margin-bottom: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.rigth-find-tools{
		display: flex;
		align-items: center;
		gap: 40px;
	}
	.left-find-tools{
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
		border-bottom: 2px solid black;
	}
</style>
