<script>
	import Modal from './Modal.svelte';
	import AlertDialog from './AlertDialog.svelte';
	import { page } from '$app/stores';
	import { lastRechennia } from '$lib/utils';
	import Timer from './Timer.svelte';
	import { fade } from 'svelte/transition';

	let ModalComponent;
	let AlertDialogComponent;

	export let kazka;
	export let type;

	let title = '';
	let new_rech = '';
	let report = '';
	let finish = false;

	export function toggleWrite() {
		if ($page.data.session) {
			report = '';
			ModalComponent.toggle();
		} else AlertDialogComponent.toggleAlert();
	}

	async function addRechennia() {
		if (new_rech === '') {
			report = 'Ви не ввели речення. Ай ай ай!';
			return;
		}
		const response = await fetch('/api/kazka/add-rechennia', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				kazka_id: kazka.id,
				rechennia_content: new_rech,
				user_id: $page.data.session.user.id,
				finish: finish
			})
		});

		if (response.ok) {
			new_rech = '';
			const { message } = await response.json();
			report = message;
		} else {
			const { error } = await response.json();
			report = error;
		}
	}

	async function newKazka() {
		if (title === '' || new_rech === '') {
			report = 'Ви не ввели назву або перше речення. Ай ай ай!';
			return;
		}
		const response = await fetch('/api/kazka/new-kazka', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: title,
				rechennia_content: new_rech,
				user_id: $page.data.session.user.id
			})
		});

		if (response.ok) {
			title = '';
			new_rech = '';
			const { message } = await response.json();
			report = message;
		} else {
			const { error } = await response.json();
			report = error;
		}
	}
</script>

<Modal outer_close={false} bind:this={ModalComponent}>
	{#if report === ''}
		{#if type === 'present'}
			<div>
				<div class="timer">
					<Timer countdown={180} on:notime={toggleWrite} />
				</div>
				<h4>{kazka.title}</h4>
				<p>{lastRechennia(kazka.rechennia).content}</p>
				<textarea bind:value={new_rech} placeholder="продовження..." autofocus></textarea>
				<div class="rech-progress">
					<progress max="10" value={kazka.rechennia.length}></progress>
					<span>{kazka.rechennia.length}/10 речень</span>
				</div>

				<div class="kazka-controls">
					<button on:click={addRechennia}>Додати речення</button>
					{#if kazka.rechennia.length >= 10}
						<label>
							<input type="checkbox" bind:checked={finish} />
							завершити казку
						</label>
					{/if}
				</div>
			</div>
		{:else if type === 'new'}
			<div>
				<input class="kazka-title" type="text" bind:value={title} placeholder="Назва казки" maxlength="40"/>
				<textarea bind:value={new_rech} placeholder="перше речення..." maxlength="1000"></textarea>
				<button on:click={newKazka}>Розпочати казку</button>
			</div>
		{/if}
	{:else}
		<div>
			<!-- <h4>Дякуємо за участь!</h4> -->
			<p>{report}</p>
		</div>
	{/if}
</Modal>

<AlertDialog bind:this={AlertDialogComponent} />

<style>
	div {
		width: 600px;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		flex-direction: column;
	}

	.timer {
		width: 10%;
		position: absolute;
		display: flex;
		left: 2em;
		top: 20px;
		align-items: left;
		flex-direction: row;
	}

	h4 {
		text-align: center;
		margin-bottom: 0;
	}

	p {
		text-align: start;
	}

	textarea {
		outline: none;
		resize: none;
		min-height: 100px;
		width: 100%;
		border-radius: 4px;
		padding: 8px;
		margin-bottom: 25px;
		border: 2px solid rgb(177, 177, 177);
	}

	textarea:focus {
		border: 2px solid black;
	}

	.kazka-title {
		border: none;
		border-bottom: 1px solid black;
		background-color: transparent;
		outline: none;
		font-size: 1em;
		font-weight: bold;
		text-align: center;
		margin-bottom: 25px;
		width: 300px;
	}
	@media screen and (max-width: 767px){
		.kazka-title{
			width: 200px;
		}
	}

	progress {
		width: 96%;
		
	}

	.rech-progress span {
		align-self: flex-end;
		padding-right: 10px;
	}

	.kazka-controls {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 30px;
	}
	@media screen and (max-width: 767px){
		div{
			width: 240px;
		}
		button{
			margin-top: 14px;
		}
		.kazka-controls{
			flex-direction: column;
			gap: 12px;
		}
	}
	@media screen and (min-width: 768px) and (max-width: 1023px){
		div{
			width: 550px;
		}
	}
</style>
