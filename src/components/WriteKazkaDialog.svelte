<script>
    import Modal from './Modal.svelte';
    import { page } from "$app/stores";

    let ModalComponent;
    export let id;
	export let title;
	export let content;

    let show_popup = false;
    let new_sentence;

    export function toggleWrite() {
        ModalComponent.toggle();
	}
</script>

<Modal outer_close={false} bind:this={ModalComponent}>
    <div>
        {#if $page.data.session}
            <h4>{title}</h4>
            <p>{content}</p>
            <textarea bind:value={new_sentence} placeholder="продовження..." autofocus></textarea>
            <button>Додати речення</button>
        {:else}
            <p>Лише автентифіковані користувачі можуть брати участь у написанні казок!</p>
        {/if}
    </div>
</Modal>
<style>
    div {
		/* width: 500px; */
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
</style>