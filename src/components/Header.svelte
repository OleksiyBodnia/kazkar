<script>
	import InfoDialog from "./InfoDialog.svelte";
	import LoginDialog from "./LoginDialog.svelte";
	let InfoDialogComponent;
	let LoginDialogComponent;
</script>

<InfoDialog bind:this={InfoDialogComponent} />
<LoginDialog bind:this={LoginDialogComponent} />

<header>
	<a class="title" href="/" onclick="window.location.href = '/';">Казкар</a> <!-- сумніваюся що правильно, але наче працює, може треба зробити кнопкою? -->
	<nav>
		<a href="/chytaty">Читати</a>
		<a href="/maisternia">Писати</a>
		<a href="/rating">Рейтинг</a>
		<button on:click={InfoDialogComponent.toggleInfoDialog}>Що тут коїться?</button>
		<button on:click={LoginDialogComponent.toggleLoginDialog}>Увійти</button>
	</nav>
</header>

<style>
	header {
		position: fixed;
		z-index: 1000;
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
		/* add gradient */
		/* background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%); */
		/* background-clip: text; */
		/* -webkit-background-clip: text; */
		/* -webkit-text-fill-color: transparent; */
	}
	.title:hover {
		/* background-image: linear-gradient(120deg, #9757aa 34%, #51889e 100%); */
	}

	nav a,nav button {
		margin-left: 1em;
		text-decoration: none;
	}

	nav button {
        border: none;
        cursor: pointer;
        padding: 0;
        font: inherit;
        outline: inherit;
	}

	nav a:hover,nav button:hover {
		/* text-decoration: underline; */
	}
</style>