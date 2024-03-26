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
>
	{#each data.kazky as kazka}
		<div class="sample">
			<KazkaCard id={kazka.id} state={"completed"} title={kazka.title} content={combineRechennia(kazka.rechennia)} />
		</div>
	{/each}
</ReadWriteTemplate>

<style>

</style>
