<script>
    import Modal from './Modal.svelte';
    import AlertDialog from './AlertDialog.svelte';
    import { page } from "$app/stores";
    import { lastRechennia } from '$lib/utils';

    let ModalComponent;
    let AlertDialogComponent;

    export let kazka;
    export let type;

    let show_popup = false;
    let new_sentence;

    export function toggleWrite() {
        if ($page.data.session)
            ModalComponent.toggle();
        else
            AlertDialogComponent.toggleAlert();
	}


</script>

<Modal outer_close={false} bind:this={ModalComponent}>
    {#if type === "present"}
        <div>
            <h4>{kazka.title}</h4>
            <p>{lastRechennia(kazka.rechennia).content}</p>
            <textarea bind:value={new_sentence} placeholder="продовження..." autofocus></textarea>
            <button>Додати речення</button>
        </div>
    {:else if type === "new"}
        <div>
            <input type="text" placeholder="Назва казки"/>
            <textarea bind:value={new_sentence} placeholder="перше речення..."></textarea>
            <button>Розпочати казку</button>
        </div>
    {/if}
</Modal>

<AlertDialog bind:this={AlertDialogComponent}/>

<style>
    div {
		width: 600px;
        display: flex;
		align-items: center;
  		/* justify-content: center; */
		flex-direction: column;
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
        resize:none;
        min-height: 100px;
        width: 100%;
        border-radius: 4px;
        padding: 8px;
        margin-bottom: 25px;
        border: 2px solid rgb(177, 177, 177);
	}

    textarea:focus{
        border: 2px solid  black;
    }

    input {
		border: none;
		border-bottom: 1px solid black;
		background-color: transparent;
		outline: none;
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        margin-bottom: 25px;
	}
</style>