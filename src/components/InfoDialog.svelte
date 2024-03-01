<script>
    let info;
	let info_is_open = false;

	export function toggleInfoDialog() {
		if (info_is_open) {
			info.close();
			info_is_open = false;
		} else {
			info.showModal();
			info_is_open = true;
		}
	}
</script>

<dialog bind:this={info}>
	<button class="close-button" on:click={toggleInfoDialog}>×</button>
	<p>Казкар — це проект створення казок на кшталт гри “Нісенітниця” на аркуші паперу, 
		де кожна фраза загортається і він передається далі.</p>
</dialog>

<style>
    dialog {
		/* треба адекватно стилізувати діалогове вікно */
		padding: 2em;
		width: 40%;
		border-radius: 20px;
	}

	dialog p{
		text-align: start;
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