<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../../components/KazkaCard.svelte';
	import ReadWriteTemplate from '../../components/ReadWriteTemplate.svelte';
	import WriteKazkaDialog from '../../components/WriteKazkaDialog.svelte';

	let RandomKazkaDialog;

	let rnd_kazka = Math.floor(Math.random() * data.kazky.length);
	function randomKazka() {
		rnd_kazka = Math.floor(Math.random() * data.kazky.length);
		RandomKazkaDialog.toggleWrite();
	}

	let NewKazkaDialog;
	async function newKazka() {
		const response = await fetch('/api/user/new-kazka', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
				title: 'Нова казка', 
				rechennia_content: 'Жили-були...', 
				user_id: data.session.user_id
			})

		});
	}
	
</script>

<ReadWriteTemplate
	header={"Майстерня Казкаря"}
	description={"Тут ви можете взяти участь у написанні казок! Правила, та та та і тому подібне"}
	{data}
	let:kazka={kazka}
>
	<button slot="rnd-kazka-btn" on:click={randomKazka}>Випадкова казка</button>
	<button slot="new-kazka-btn" on:click={() => NewKazkaDialog.toggleWrite()}>Розпочати нову казку</button>

	<KazkaCard state={"incompleted"} {kazka} />

</ReadWriteTemplate>

<WriteKazkaDialog bind:this={RandomKazkaDialog} type={"present"} kazka={data.kazky[rnd_kazka]}/>
<WriteKazkaDialog bind:this={NewKazkaDialog} type={"new"} />

<style>
	
</style>
