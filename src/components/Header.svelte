<script>
	import InfoDialog from './InfoDialog.svelte';
	import LoginDialog from './LoginDialog.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let InfoDialogComponent;
	let LoginDialogComponent;

	onMount(() => {
		if ($page.data.session) {
			console.log($page.data.session);
			fetch('/api/users/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: $page.data.session.user.name,
					email: $page.data.session.user.email,
					user_sub: $page.data.session.user.id
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	});

	/*
	function setUserId(events) {
		//docs - https://authjs.dev/getting-started/session-management/get-session#:~:text=Then%20you%20can%20access%20the%20session%20on%20the%20%24page.data%20object%20in%20your%20page.
		// console.log($page.data.session?.user?.id)//.user?.id)
		localStorage.setItem('userid', $page.data.session?.user?.id);

		// cookies.set('userid', $page.data.session?.user?.id);
		// cookies.set('visited', 'true', { path: '/' });
	}

	 */
</script>

<InfoDialog bind:this={InfoDialogComponent} />
<LoginDialog bind:this={LoginDialogComponent} />

<header>
	<a class="title" href="/">Казкар</a>
	<!-- треба зробит так, щоб при натисканні головна строрінка оновлювалася навіть коли вона є поточною -->
	<nav>
		<a href="/chytaty" class="header-link">Читати</a>
		<a href="/maisternia" class="header-link">Писати</a>
		<a href="/rating" class="header-link">Рейтинг</a>
		<button on:click={InfoDialogComponent.toggleInfoDialog}>Що тут коїться?</button>
		<!-- <button on:click={LoginDialogComponent.toggleLoginDialog}>Увійти</button> -->
		{#if $page.data.session}
			<button on:click={() => signOut()}>Вийти</button>
		{:else}
			<button on:click={() => signIn()}>Увійти</button>
		{/if}
	</nav>
</header>

<style>
	header {
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 4rem;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		background-color: white;
	}

	.title {
		font-size: 1.7rem;
		font-weight: bold;
		text-decoration: none;
	}

	nav a,
	nav button {
		margin-left: 1em;
	}

	nav button {
		border: none;
		cursor: pointer;
		padding: 0;
		font: inherit;
		outline: inherit;
	}
	.header-link:hover,
	.header-link:focus {
		background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
