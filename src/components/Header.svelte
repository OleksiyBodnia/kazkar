<script>
	import InfoDialog from "./InfoDialog.svelte";
	import LoginDialog from "./LoginDialog.svelte";
	let InfoDialogComponent;
	let LoginDialogComponent;
</script>

<InfoDialog bind:this={InfoDialogComponent} />
<LoginDialog bind:this={LoginDialogComponent} />

<header>
	<a class="title" href="/" onclick="window.location.href = '/'">Казкар</a> <!-- сумніваюся що правильно, але наче працює, може треба зробити кнопкою? -->
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
		text-decoration: none;
	}

	nav button {
        border: none;
        cursor: pointer;
        padding: 0;
        font: inherit;
        outline: inherit;
	}
</style>