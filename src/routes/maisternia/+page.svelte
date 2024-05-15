<script>
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
