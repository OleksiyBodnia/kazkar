<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../../components/KazkaCard.svelte';
	import { combineRechennia } from '$lib/utils';
	import ReadWriteTemplate from '../../components/ReadWriteTemplate.svelte';
	
</script>

<ReadWriteTemplate
	header={"Бібліотека завершених казок"}
	description={"Тут ви можете знайти безліч завершених казок - читайте, досліджуйте, \
					надихайтеся, смійтеся (крінж опис треба поміняти)"}
	{data}
	let:kazka={kazka}
>
	
	<KazkaCard id={kazka.id} state={"completed"} title={kazka.title} 
				content={combineRechennia(kazka.rechennia)} />

</ReadWriteTemplate>

<style>

</style>
