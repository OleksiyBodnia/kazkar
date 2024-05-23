<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import KazkaCard from '@components/KazkaCard.svelte';
	import ReadWriteTemplate from '@components/ReadWriteTemplate.svelte';
	import WriteKazkaDialog from '@components/WriteKazkaDialog.svelte';

	let random_kazka = {};
	let RandomKazkaDialog;
	let NewKazkaDialog;

	let y = 0;

	async function openRandomKazka() {
		random_kazka = await fetch('/api/kazka/get-random')
			.then((r) => r.json())
			.then((data) => data.kazka[0]);

		RandomKazkaDialog.toggleWrite();
	}

	async function updateKazka(id) {
		const updated_kazka = await fetch(`/api/kazka/get?id=${id}`).then((r) =>
			r.json().then((data) => data.kazka)
		);

		const index = data.kazky.findIndex((k) => k.id === id);
		data.kazky[index] = updated_kazka;
	}
</script>

<svelte:window bind:scrollY={y} />

<ReadWriteTemplate
	state={'incompleted'}
	header={'Майстерня Казкаря'}
	description={'Тут ви можете взяти участь у написанні казок! Правила, та та та і тому подібне'}
	{data}
	{random_kazka}
	kazky_per_page={data.kazky_per_page}
	let:kazka
>
	<button slot="rnd-kazka-btn" on:click={openRandomKazka}>Випадкова казка</button>
	<button slot="new-kazka-btn" on:click={() => NewKazkaDialog.toggleWrite()}
		>Розпочати нову казку</button
	>

	<KazkaCard state={'incompleted'} {kazka} />
</ReadWriteTemplate>

<WriteKazkaDialog bind:this={RandomKazkaDialog} type={'present'} kazka={random_kazka} />
<WriteKazkaDialog bind:this={NewKazkaDialog} type={'new'} />

<style>
</style>
