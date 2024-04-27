<script>
	import { truncateText } from '$lib/utils';
	import WriteKazkaDialog from './WriteKazkaDialog.svelte';
	import AlertDialog from './AlertDialog.svelte';
	import { page } from "$app/stores";
	
	export let id;
	export let title;
	export let content;
	export let state;

	let WriteDialogComponent;
	let AlertDialogComponent;
	
</script>

{#if state == "completed"}
	<article>
		<a href="/kazka/{id}">
			<h4>{title}</h4>
			<p>{truncateText(content, 160)}</p>
		</a>
	</article>
{:else if state == "incompleted"}
	<article on:click={() => {
		if ($page.data.session)
			WriteDialogComponent.toggleWrite();
		else
			AlertDialogComponent.toggleAlert();
	}
	 }>
		<h4>{title}</h4>
		<p>{truncateText(content, 160)}</p>
	</article>
	<WriteKazkaDialog bind:this={WriteDialogComponent} {id} {title} {content} />
	<AlertDialog bind:this={AlertDialogComponent} />
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
