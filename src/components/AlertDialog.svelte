<script>
    import { signIn } from '@auth/sveltekit/client';
	import Modal from './Modal.svelte';

	let ModalComponent;
	export function toggleAlert() {
		ModalComponent.toggle();
	}
</script>

<Modal bind:this={ModalComponent}>
    <div>
		<p>Лише автентифікованим користувачам доступне написання казок, зарахування переглядів та додавання уподобайок!</p>
        <button on:click={() => signIn()}>Увійти</button>
    </div>
	
</Modal>

<style>
	p {
		text-align: start;
	}

    div {
		/* width: 500px; */
        display: flex;
		align-items: center;
  		/* justify-content: center; */
		flex-direction: column;
	}
</style>
