<script>
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../../components/KazkaCard.svelte';
	import ReadWriteTemplate from '../../components/ReadWriteTemplate.svelte';
	import WriteKazkaDialog from '../../components/WriteKazkaDialog.svelte';

	let RandomKazkaDialog;
	let NewKazkaDialog;

	let y = 0;

	let rnd_kazka = Math.floor(Math.random() * data.kazky.length);
	function randomKazka() {
		rnd_kazka = Math.floor(Math.random() * data.kazky.length);
		RandomKazkaDialog.toggleWrite();
	}

	async function updateKazkas() {
		// skip update if user is not on the tab
		if (document.visibilityState !== 'visible') return;

		// kazky with id and last update timestamp ('id', 'updated_at')
		const kazky_updates = await fetch('/api/get-kazky-updates?state=incompleted').then((r) =>
			r.json().then((data) => data.kazky)
		);

		let updated_kazky = [];

		// compare local data.kazky with kazky_updates
		// if kazka is updated, fetch it from server
		for (const kazka of data.kazky) {
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

		data.kazky = updated_kazky;
	}

	onMount(() => {
		// call updateKazkas every 5 seconds
		const interval = setInterval(updateKazkas, 5000);
		return () => clearInterval(interval);
		// updateKazkas();
	});
</script>

<svelte:window bind:scrollY={y} />

<ReadWriteTemplate
	state={'incompleted'}
	header={'Майстерня Казкаря'}
	description={'Тут ви можете взяти участь у написанні казок! Правила, та та та і тому подібне'}
	{data}
	let:kazka
>
	<button slot="rnd-kazka-btn" on:click={randomKazka}>Випадкова казка</button>
	<button slot="new-kazka-btn" on:click={() => NewKazkaDialog.toggleWrite()}
		>Розпочати нову казку</button
	>

	<KazkaCard state={'incompleted'} {kazka} />
</ReadWriteTemplate>

<WriteKazkaDialog bind:this={RandomKazkaDialog} type={'present'} kazka={data.kazky[rnd_kazka]} />
<WriteKazkaDialog bind:this={NewKazkaDialog} type={'new'} />

<style>
</style>
