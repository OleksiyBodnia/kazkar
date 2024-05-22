<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '@components/KazkaCard.svelte';
	import ReadWriteTemplate from '@components/ReadWriteTemplate.svelte';
</script>

<ReadWriteTemplate
	state={'completed'}
	header={'Бібліотека завершених казок'}
	description={'Тут ви можете знайти безліч завершених казок - читайте, досліджуйте, \
					надихайтеся, смійтеся (крінж опис треба поміняти)'}
	{data}
	let:kazka
>
	<a slot="rnd-kazka-btn" href="/kazka/{data.random_kazka.id}">
		<button>Випадкова казка</button>
	</a>

	<KazkaCard state={'completed'} {kazka} />
</ReadWriteTemplate>

<style>
</style>
