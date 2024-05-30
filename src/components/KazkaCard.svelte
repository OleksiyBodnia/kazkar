<script>
	import { lastRechennia, isKazkaTaken, takeKazka } from '$lib/utils';
	import WriteKazkaDialog from './WriteKazkaDialog.svelte';
	import { page } from '$app/stores';
	import Modal from './Modal.svelte';
	import AlertDialog from './AlertDialog.svelte';

	export let kazka;
	export let state;

	let last_rech = lastRechennia(kazka.rechennia);

	let WriteDialogComponent;
	let IsTakenModal;
	let IsLastUserModal;
	let AlertDialogComponent;

	async function tryWriteKazka() {
		if (!$page.data.session) {
			AlertDialogComponent.toggleAlert();
		} else if (kazka.last_user_id == $page.data.session.user.id) {
			IsLastUserModal.toggle();
		} else if (await isKazkaTaken(kazka.id)) {
			IsTakenModal.toggle();
		} else {
			takeKazka(kazka);
			WriteDialogComponent.toggleWrite();
		}
	}
</script>

{#if state == 'completed'}
	<article class="comp-article">
		<a href="/kazka/{kazka.id}">
			<div class="kazka-container">
				<h4>{kazka.title}</h4>
				{#each kazka.rechennia as rechennia}
					{#if $page.data.session && $page.data.session.user.id == rechennia.user_id}
						<span style="color: var(--color-accent);">{rechennia.content}</span>
					{:else}
						<span>{rechennia.content} </span>
					{/if}
				{/each}
			</div>
			<div class="kazka-stats">{kazka.stats.views}&#128065 {kazka.stats.likes}&hearts;</div>
		</a>
	</article>
{:else if state == 'incompleted'}
	<button class="custom-btn" on:click={tryWriteKazka}>
		<article class="incomp-article">
			<div class="rech-conteiner">
				<h4>{kazka.title}</h4>
				{#if $page.data.session && $page.data.session.user.id == last_rech.user_id}
					<span style="color: var(--color-accent);">{last_rech.content}</span>
				{:else}
					<span>{last_rech.content}</span>
				{/if}
			</div>
			<div class="kazka-count">{kazka.rechennia.length}/10</div>
		</article>
	</button>
	<WriteKazkaDialog bind:this={WriteDialogComponent} type={'present'} {kazka} />
	<Modal bind:this={IsTakenModal}>
		<div class="kazka-taken-alert">
			<p>Упс, хтось вже пише цю казку...</p>
		</div>
	</Modal>
	<Modal bind:this={IsLastUserModal}>
		<div class="kazka-taken-alert">
			<p>Почекай, поки хтось інший додасть речення до цієї казки.</p>
		</div>
	</Modal>
	<AlertDialog bind:this={AlertDialogComponent} />
{/if}

<style>
	article {
		margin: 10px;
		box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
		border-radius: 24px;
	}

	article:hover {
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
		transition: all 0.5s ease;
		cursor: pointer;
	}

	.comp-article {
		width: 500px;
		padding: 0px 10px 17px 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.incomp-article {
		width: 500px;
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
		height: 128px;
		overflow: hidden;
	}

	.rech-conteiner {
		height: 112px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}

	.kazka-stats {
		text-align: right;
		/* position: relative; */
	}

	.kazka-count {
		align-self: flex-end;
		text-align: right;
		position: relative;
		top: -9px;
	}
	@media screen and (max-width: 767px) {
		.comp-article,
		.incomp-article {
			width: 340px;
		}
		.kazka-container {
			height: 125px;
			overflow: hidden;
		}
	}
</style>
