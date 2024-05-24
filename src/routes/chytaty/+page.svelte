<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import KazkaCard from '@components/KazkaCard.svelte';
	import ReadWriteTemplate from '@components/ReadWriteTemplate.svelte';
</script>

<ReadWriteTemplate
	state={'completed'}
	header={'Бібліотека завершених казок'}
	description={'Тут можна знайти безліч завершених казок - читай неймовірні, \
		надзвичайні казки, а також не забудь поставити уподобайку! '}
	{data}
	random_kazka={data.random_kazka}
	kazky_per_page={data.kazky_per_page}
	let:kazka
>
	<a slot="rnd-kazka-btn" href="/kazka/{data.random_kazka.id}">
		<button>Випадкова казка</button>
	</a>

	<KazkaCard state={'completed'} {kazka} />
</ReadWriteTemplate>

<style>
</style>
