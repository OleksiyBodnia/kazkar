<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '../../components/KazkaCard.svelte';
	import ReadWriteTemplate from '../../components/ReadWriteTemplate.svelte';

	let rnd_kazka = Math.floor(Math.random() * data.kazky.length);
</script>

<ReadWriteTemplate
	header={'Бібліотека завершених казок'}
	description={'Тут ви можете знайти безліч завершених казок - читайте, досліджуйте, \
					надихайтеся, смійтеся (крінж опис треба поміняти)'}
	{data}
	let:kazka
>
	<a slot="rnd-kazka-btn" href="/kazka/{data.kazky[rnd_kazka]?.id || 1}">
		<button>Випадкова казка</button>
	</a>

	<KazkaCard state={'completed'} {kazka} />
</ReadWriteTemplate>

<style>
</style>
