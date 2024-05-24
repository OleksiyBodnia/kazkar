<script>
	import { page } from '$app/stores';
	import { lastRechennia } from '$lib/utils';
	import AlertDialog from './AlertDialog.svelte';

	export let data;
	export let users;

	let AlertDialogComponent;

	let stats = { views: '...', likes: '...', entry: { like: false } };

	$: data.stats.then((s) => (stats = s));

	let unique_users = [];
	$: {
		if (users)
			unique_users = users.filter(
				(user, index, self) => index === self.findIndex((u) => u.name === user.name)
			);
	}

	function niceTime(rech) {
		const date = new Date(rech.created_at);

		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	async function Like() {
		const response = await fetch(`/api/kazka/like`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: data.session.user.id,
				kazka_id: data.kazka.id,
				like: !stats.entry.like
			})
		});

		if (response.ok) {
			if (stats.entry.like) {
				stats.likes--;
			} else {
				stats.likes++;
			}
			stats.entry.like = !stats.entry.like;
			// const { message } = await response.json();
			// console.log(message);
		} else {
			// const { error } = await response.json();
			// console.error(error);
		}
	}
</script>

<AlertDialog bind:this={AlertDialogComponent} />
<aside>
	<h4>Інформація про казку</h4>
	<p>
		Період створення:<br />
		з {niceTime(data.kazka.rechennia[0])}<br />
		по {niceTime(lastRechennia(data.kazka.rechennia))}
	</p>
	<p>Всього реченнь: {data.kazka.rechennia.length}</p>
	<p>
		Унікальних авторів:
		{unique_users.length}
	</p>

	<p>Переглядів: {stats.views}</p>
	<p>Уподобайок: {stats.likes}</p>
	{#if $page.data.session}
		{#if stats.entry.like}
			<p><button class="button-is-clicked" on:click={Like}>&hearts; лайк?</button></p>
		{:else}
			<p><button on:click={Like}>&hearts; лайк?</button></p>
		{/if}
	{:else}
		<p><button on:click={AlertDialogComponent.toggleAlert}>&hearts; лайк?</button></p>
	{/if}
</aside>

<style>
	aside {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 2px 20px;
		border: 2px solid black;
		border-radius: 20px;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	p {
		text-align: center;
	}

	/* .button-is-clicked {
        background-color: var(--color-accent);
        color: white;
        border: 2px solid var(--color-accent);
        cursor: pointer;
    } */

	@media screen and (max-width: 767px) {
		aside {
			border: none;
		}
	}

	@media screen and (min-width: 768px) and (max-width: 1023px) {
		aside {
			width: 190px;
		}
		h4 {
			text-align: center;
			width: 180px;
			text-wrap: wrap;
		}
	}
</style>
