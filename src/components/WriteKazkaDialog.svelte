<script>
    import Modal from './Modal.svelte';

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
        <h4>{title}</h4>
        <p>{content}</p>
        <textarea bind:value={new_sentence} placeholder="продовження..." autofocus></textarea>
        <button>btn</button>
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
	}

	p {
		text-align: start;
	}

    textarea {
		flex: 1;
		resize: none;
        width: 90%;
	}
</style>