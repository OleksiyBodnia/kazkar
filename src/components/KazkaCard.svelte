<script>
	import { truncateText, lastRechennia, combineRechennia } from '$lib/utils';
	import WriteKazkaDialog from './WriteKazkaDialog.svelte';
	
	export let kazka;
	export let state;

	let WriteDialogComponent;

	
</script>

{#if state == "completed"}
	<article>
		<a href="/kazka/{kazka.id}">
			<h4>{kazka.title}</h4>
			<p>{truncateText(combineRechennia(kazka.rechennia), 160)}</p>
		</a>
	</article>
{:else if state == "incompleted"}
	<article on:click={() => WriteDialogComponent.toggleWrite()}>
		<h4>{kazka.title}</h4>
		<p>{truncateText(lastRechennia(kazka.rechennia).content, 160)}</p>
	</article>
	<WriteKazkaDialog bind:this={WriteDialogComponent} type={"present"} {kazka} />
{/if}

<style>
	article {
		width: 500px;
		/* some padding should be here */
		border-radius: 24px;
		padding: 1px 10px 10px 10px;
	}

	article:hover {
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
		transition: all 0.5s ease;
		cursor: pointer;
	}

	h4 {
		text-align: center;
	}

	p {
		text-align: start;
	}
</style>
