<script>
	import InfoDialog from "./InfoDialog.svelte";
	import LoginDialog from "./LoginDialog.svelte";
	import { signIn, signOut} from "@auth/sveltekit/client";
	import { page } from "$app/stores";

	let InfoDialogComponent;
	let LoginDialogComponent;
</script>

<InfoDialog bind:this={InfoDialogComponent} />
<LoginDialog bind:this={LoginDialogComponent} />

<header>
	<a class="title" href="/">Казкар</a> <!-- треба зробит так, щоб при натисканні головна строрінка оновлювалася навіть коли вона є поточною -->
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

	nav a,nav button {
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
	.header-link:focus{
		background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>