<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../../components/KazkaCard.svelte';
	import { combineRechennia } from '$lib/utils';
	import ReadWriteTemplate from '../../components/ReadWriteTemplate.svelte';

</script>

<ReadWriteTemplate
	header={"Майстерня Казкаря"}
	description={"Тут ви можете взяти участь у написанні казок! Правила, та та та і тому подібне"}
>
	{#each data.kazky as kazka}
		<div class="sample">
			<KazkaCard id={kazka.id} title={kazka.title} content={combineRechennia(kazka.rechennia)} />
		</div>
	{/each}
</ReadWriteTemplate>


<style>
	
</style>
