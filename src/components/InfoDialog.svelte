<script>
	import Modal from './Modal.svelte';

	let ModalComponent;
	export function toggleInfoDialog() {
		ModalComponent.toggleModal();
	}
</script>

<Modal bind:this={ModalComponent}>
	<p>
		Казкар — це проєкт створення казок на кшталт гри “Нісенітниця” на аркуші паперу, де кожна фраза
		загортається і він передається далі.
	</p>
</Modal>

<style>
	p {
		text-align: start;
	}
</style>
