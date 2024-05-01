<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../../components/KazkaCard.svelte';
	import { lastRechennia } from '$lib/utils';
	import ReadWriteTemplate from '../../components/ReadWriteTemplate.svelte';

</script>

<ReadWriteTemplate
	header={"Майстерня Казкаря"}
	description={"Тут ви можете взяти участь у написанні казок! Правила, та та та і тому подібне"}
	{data}
	let:kazka={kazka}
>

	<button slot="new-kazka">Розпочати нову казку</button>

	<KazkaCard id={kazka.id} state={"incompleted"} title={kazka.title} 
				content={lastRechennia(kazka.rechennia).content} />

</ReadWriteTemplate>


<style>
	
</style>
