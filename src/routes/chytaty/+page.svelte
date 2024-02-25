<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Kazka from '../../components/Kazka.svelte';
</script>

<h1>Завершені казки</h1>

{#each data.kazky as kazka}
	<Kazka title={kazka.title} content={kazka.content} time_stamp={kazka.completed_at} />
{/each}

<style>
	h1 {
		text-align: center;
	}
</style>
