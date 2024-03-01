<script>
	let info;
	let info_is_open = false;

	function toggleInfoDialog() {
		if (info_is_open) {
			info.close();
			info_is_open = false;
		} else {
			info.showModal();
			info_is_open = true;
		}
	}
</script>

<header>
	<a class="title" href="/">Казкар</a>
	<nav>
		<a href="/chytaty">Читати</a>
		<a href="/maisternia">Писати</a>
		<a href="/reitynh">Рейтинг</a>
		<button on:click={toggleInfoDialog}>Що тут коїться?</button>
		<button>Увійти</button>
	</nav>
</header>

<dialog bind:this={info}>
	<p>Казкар — це проект створення казок на кшталт гри “Нісенітниця” на аркуші паперу, 
		де кожна фраза загортається і він передається далі.</p>
	<button class="close-button" on:click={toggleInfoDialog}>×</button>
</dialog>

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
		/* background-color: #f3f3f3; */
	}

	.title {
		font-size: 1.7rem;
		font-weight: bold;
		text-decoration: none;
		/* add gradient */
		background-image: linear-gradient(120deg, #78009d 34%, #0087bc 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.title:hover {
		background-image: linear-gradient(120deg, #9757aa 34%, #51889e 100%);
	}

	nav a,nav button {
		margin-left: 1em;
		text-decoration: none;
	}

	nav button {
		background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        font: inherit;
        outline: inherit;
	}

	nav a:hover,nav button:hover {
		text-decoration: underline;
	}

	dialog {
		/* треба адекватно стилізувати діалогове вікно */
		padding: 2em;
		width: 50%;
		border-radius: 20px;
	}
	dialog::backdrop {
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.5);
    }

    .close-button {
    position: absolute;
    top: 0.2em;
    right: 0.5em;
    background-color: transparent;
    border: none;
    font-size: 2em;
    cursor: pointer;
	}

	.close-button:hover {
		color: red;
	}

</style>