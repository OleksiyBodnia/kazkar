<script>
	import { truncateText, lastRechennia, combineRechennia } from '$lib/utils';
	import WriteKazkaDialog from './WriteKazkaDialog.svelte';
	import { page } from '$app/stores';
	
	export let kazka;
	export let state;

	let WriteDialogComponent;
</script>

{#if state == "completed"}
	<article class="comp-article">
		<a href="/kazka/{kazka.id}">
			<div class="kazka-container">
				<h4>{kazka.title}</h4>
				{#each kazka.rechennia as rechennia}
					{#if $page.data.session.user.id == rechennia.user_id}
						<span style="color: var(--color-user);">{rechennia.content} </span>
					{:else}
						<span>{rechennia.content} </span>
					{/if}
					<span>{rechennia.content} </span>
				{/each}
			</div>
		</a>
	</article>
{:else if state == "incompleted"}
	<button class="custom-btn" on:click={() => WriteDialogComponent.toggleWrite()}>
		<article class="incomp-article">
			<div class="rech-conteiner">
				<h4>{kazka.title}</h4>
				<span>{lastRechennia(kazka.rechennia).content}</span>
			</div>
		</article>
	</button>
	<WriteKazkaDialog bind:this={WriteDialogComponent} type={"present"} {kazka} />
{/if}

<style>
	.comp-article {
		width: 500px;	
		/* some padding should be here */
		border-radius: 24px;
		padding: 0px 10px 17px 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	article:hover {
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
		transition: all 0.5s ease;
		cursor: pointer;
	}
	.incomp-article{
		width: 500px;	
		/* some padding should be here */
		border-radius: 24px;
		padding: 0px 10px 10px 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h4 {
		text-align: center;
	}

	span {
		text-align: start;
	}

	.custom-btn {
		width: 100%;
		all: unset;
		
	}

	.custom-btn:hover {
		all: unset;
	}

	.kazka-container {
		height: 133px;
		overflow: hidden;
	}

	.rech-conteiner {
		height: 113px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}
</style>
